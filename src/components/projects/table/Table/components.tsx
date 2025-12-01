import { Link } from "react-router"
import { setIconVariant, ZoningOrdinanceMap, handleRowStyling, setMilestoneIconVariant, setVestingIconVariant, handleDetailsBtnIcon } from './utils'
import { useHandleTableRowHover, useHandleProjectCell, useHandleProjectName } from './hooks'
import styles from './Table.module.css'

// Types
import * as AppTypes from '@/context/types'

// Components
import Icons from "@/components/icons/Icons/Icons"

export const TableBody = ({ projects }: { projects: AppTypes.ProjectInterface[] }) => { // Projects table body

  return (
    <tbody>
      {projects.map((project) => {
        return (
          <TableRow
            key={`project-table-row-${ project.uuid }`}
            project={project} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ project }: { project: AppTypes.ProjectInterface }) => {
  const { trProps, hovered } = useHandleTableRowHover()

  const cellProps = { project, hovered }

  return (
    <tr 
      key={`table-row-${ project.uuid }`}
      className={handleRowStyling(project)}
      { ...trProps }>
        <ProjectCell { ...cellProps } />
        <Milestones { ...cellProps } />
        <VestingPeriods { ...cellProps } />
    </tr>
  )
}

type ProjectCellProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const ProjectCell = (props: ProjectCellProps) => {
  const btnProps = useHandleProjectCell()

  return (
    <td>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <ProjectName project={props.project} />
          <span className="text-sm font-light italic ml-2 whitespace-nowrap"><a href={`https://franklintn.geocivix.com/secure/project/?projTitle=${ props.project.cof }&searchtype=review&ProjectActive=1&step=results`} target='_blank' title={`Search COF# ${ props.project.cof } on GeoCivix`}>COF# {props.project.cof}</a></span>
        </div>
        <DetailsBtn
          hovered={props.hovered}
          { ...btnProps } />
        <ProjectDetails
          project={props.project}
          hovered={props.hovered}
          expanded={btnProps.expanded} />
      </div>
    </td>
  )
}

const ProjectName = ({ project }: { project: AppTypes.ProjectInterface }) => {
  const hasActiveAccount = useHandleProjectName()

  if(!hasActiveAccount) return ( // Unauthenticated
    <span className="text-lg font-bold uppercase whitespace-wrap">{project.name} // </span>
  )

  return (
    <Link 
      to={`/update/${ project.uuid }`} 
      className="text-lg font-bold uppercase whitespace-wrap hover:text-warning" 
      title={`Update ${ project.name }`}>
        {project.name} //
    </Link>
  )
}

type ProjectDetailsProps = { project: AppTypes.ProjectInterface, hovered: boolean, expanded: boolean }

const ProjectDetails = (props: ProjectDetailsProps) => {
  const { expanded, ...detailProps } = props

  if(!expanded) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 justify-around">
        <ProjectType { ...detailProps } />
        <Ordinance { ...detailProps } />
        <Resolution { ...detailProps } />
      </div>

      <ProjectNotes project={detailProps.project} />
    </div>
  )
}

type ProjectTypeProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const ProjectType = (props: ProjectTypeProps) => {
  
  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'type'}
        variant={setIconVariant(props.project, props.hovered)}
        size={'small'} />
      <small className="underline">Type:</small>
      <small className="whitespace-nowrap">{props.project.type}</small>
    </div>
  )
}

type OrdinanceProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const Ordinance = (props: OrdinanceProps) => {

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'ordinance'}
        variant={setIconVariant(props.project, props.hovered)}
        size={'small'} />
      <small className="underline">Ordinance:</small>
      <OrdinanceLink project={props.project} />
    </div>
  )
}

const OrdinanceLink = ({ project }: { project: AppTypes.ProjectInterface }) => {
  const ordinanceLink = ZoningOrdinanceMap.get(project.ordinance)

  return (
    <a href={ordinanceLink} target="_blank"><small className="whitespace-nowrap hover:text-warning" title={`View ${ project.ordinance } Ordinance`}>{project.ordinance}</small></a>
  )
}

type ResolutionProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const Resolution = (props: ResolutionProps) => {
  if(!props.project.Resolution) return null

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'resolution'}
        variant={setIconVariant(props.project, props.hovered)}
        size={'small'} />
      <small className="underline">Resolution:</small>
      <small className="whitespace-nowrap">{props.project.Resolution.resolution}</small>
    </div>
  )
}

const ProjectNotes = ({ project }: { project: AppTypes.ProjectInterface }) => {
  if(!project.notes) return null

  return (
    <small className="wrap text-center italic">"{project.notes}"</small>
  )
}

type MilestonesProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const Milestones = (props: MilestonesProps) => {

  return (
    <td>
      <div className="flex flex-col justify-between gap-6 m-auto p-3 w-fit lg:flex-row">
        <FirstMilestone { ...props } />
        <SecondMilestone { ...props } />
      </div>
    </td>
  )
}

type FirstMilestoneProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const FirstMilestone = (props: FirstMilestoneProps) => {
  const firstMilestone = props.project.Milestones?.find(milestone => milestone.number === 1)

  return (
    <div className="flex flex-col items-center" title="1st Milestone: Site Preperation">
      <Icons
        type={'firstMilestone'}
        variant={setMilestoneIconVariant(firstMilestone, props.project, props.hovered)}
        size={'large'} />
      <small className="-translate-y-1">1st Milestone</small>
      <Milestone milestone={firstMilestone} />
      <MilestoneExtension milestone={firstMilestone} />
    </div>
  )
}

const Milestone = ({ milestone }: { milestone: AppTypes.MilestoneInterface | undefined }) => {
  if(!milestone || milestone?.MilestoneExtension) return null

  return (
    <span className="whitespace-nowrap">{milestone.date}</span>
  )
}

const MilestoneExtension = ({ milestone }: { milestone: AppTypes.MilestoneInterface | undefined }) => {
  if(!milestone?.MilestoneExtension) return null

  return (
    <div className="relative flex gap-1 w-fit">
      <div className="whitespace-nowrap">{milestone.MilestoneExtension.date}<span className={styles.extension}>extended</span></div>
    </div>
  )
}

type SecondMilestoneProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const SecondMilestone = (props: SecondMilestoneProps) => {
  const secondMilestone = props.project.Milestones?.find(milestone => milestone.number === 2)

  return (
    <div className="flex flex-col items-center" title="2nd Milestone: Vertical Construction">
      <Icons
        type={'secondMilestone'}
        variant={setMilestoneIconVariant(secondMilestone, props.project, props.hovered)}
        size={'large'} />
      <small className="-translate-y-1">2nd Milestone</small>
      <Milestone milestone={secondMilestone} />
      <MilestoneExtension milestone={secondMilestone} />
    </div>
  )
}

type VestingPeriodsProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const VestingPeriods = (props: VestingPeriodsProps) => {

  return (
    <td>
      <div className="flex justify-between gap-6 m-auto p-3 w-fit">
        <TenYearVesting { ...props } />
        <FifteenYearVesting { ...props } />
      </div>
    </td>
  )
}

type TenYearVestingProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const TenYearVesting = (props: TenYearVestingProps) => {
  const tenYearVesting = props.project.VestingPeriods?.find(period => period.type === "10Y")

  if(!tenYearVesting) return null

  if(props.project.expired) return (
    <span className="text-3xl font-[play] italic uppercase font-bold">Expired</span>
  )

  if(tenYearVesting.VestingStatus?.achieved) return (
    <span className="text-3xl font-[play] italic uppercase font-bold">Completed</span>
  )

  return (
    <div className="flex flex-col items-center text-center" title="10 year vesting period date">
      <Icons
        type={'tenYear'}
        variant={setVestingIconVariant(tenYearVesting, props.project, props.hovered)} 
        size={'large'} />
      <small>10 Year Vesting</small>
      <VestingPeriod period={tenYearVesting} />
      <VestingPeriodExtension period={tenYearVesting} />
    </div>
  )
}

type FifteenYearVestingProps = { project: AppTypes.ProjectInterface, hovered: boolean }

const FifteenYearVesting = (props: FifteenYearVestingProps) => {
  const fifteenYearVesting = props.project.VestingPeriods?.find(period => period.type === "15Y")

  if(!fifteenYearVesting) return null

  if(fifteenYearVesting.VestingStatus?.achieved) return (
    <span className="text-3xl font-[play] italic uppercase font-bold">Completed</span>
  )

  return (
    <div className="flex flex-col items-center text-center" title="15 year vesting period date">
      <Icons
        type={'fifteenYear'}
        variant={setVestingIconVariant(fifteenYearVesting, props.project, props.hovered)} 
        size={'large'} />
      <small>Fifteen Year Vesting</small>
      <VestingPeriod period={fifteenYearVesting} />
      <VestingPeriodExtension period={fifteenYearVesting} />
    </div>
  )
}

const VestingPeriod = ({ period }: { period: AppTypes.VestingPeriodInterface }) => {
  if(!period || period?.VestingExtension) return null

  return (
    <span className="whitespace-nowrap">{period.date}</span>
  )
}

const VestingPeriodExtension = ({ period }: { period: AppTypes.VestingPeriodInterface }) => {
  if(!period?.VestingExtension) return null

  return (
    <div className="relative flex gap-1 w-fit">
      <div className="whitespace-nowrap">{period.VestingExtension.date}<span className={styles.extension}>extended</span></div>
    </div>
  )
}

type DetailsBtnProps = { expanded: boolean, hovered: boolean, onClick: () => void }

const DetailsBtn = (props: DetailsBtnProps) => {
  const iconProps = handleDetailsBtnIcon(props)

  return (
    <button 
      type="button"
      onClick={props.onClick}
      className="m-auto w-fit hover:cursor-pointer">
        <Icons { ...iconProps } />
    </button> 
  )
}