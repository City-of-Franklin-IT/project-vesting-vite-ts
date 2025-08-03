import { useState } from "react"
import { useMsal } from "@azure/msal-react"
import { setIconVariant, ZoningOrdinanceMap, handleRowStyling, setMilestoneIconVariant, setVestingIconVariant } from './utils'
import { useHandleTableRowHover } from './hooks'
import styles from './Table.module.css'

// Types
import { MilestoneInterface, ProjectInterface, VestingPeriodInterface } from "@/context/types"

// Components
import Icons from "@/components/icons/Icons/Icons"
import { Link } from "react-router"

export const TableBody = ({ projects }: { projects: ProjectInterface[] }) => { // Projects table body

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

const TableRow = ({ project }: { project: ProjectInterface }) => {
  const { onMouseEnter, onMouseLeave, hovered } = useHandleTableRowHover()

  return (
    <tr 
      key={`table-row-${ project.uuid }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={handleRowStyling(project)}>
        <td>
          <ProjectCell
            project={project}
            hovered={hovered} />
        </td>
        <td>
          <Milestones
            project={project}
            hovered={hovered} />
        </td>
        <td>
          <VestingPeriods
            project={project}
            hovered={hovered} />
        </td>
    </tr>
  )
}

const ProjectCell = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: false })

  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <ProjectName project={project} />
        <span className="text-sm font-light italic ml-2 whitespace-nowrap"><a href={`https://franklintn.geocivix.com/secure/project/?projTitle=${ project.cof }&searchtype=review&ProjectActive=1&step=results`} target='_blank' title={`Search COF# ${ project.cof } on GeoCivix`}>COF# {project.cof}</a></span>
      </div>
      <DetailsBtn
        expanded={state.expanded}
        hovered={hovered}
        handleClick={() => setState(prevState => ({ expanded: !prevState.expanded }))} />
      <ProjectDetails
        project={project}
        hovered={hovered}
        expanded={state.expanded} />
    </div>
  )
}

const ProjectName = ({ project }: { project: ProjectInterface }) => {
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  if(!activeAccount) return <span className="text-lg font-bold uppercase whitespace-wrap" title={`Update ${ project.name }`}>{project.name} // </span>

  return (
    <Link to={`/update/${ project.uuid }`} className="text-lg font-bold uppercase whitespace-wrap hover:text-warning" title={`Update ${ project.name }`}>{project.name} //</Link>
  )
}

const ProjectDetails = ({ project, hovered, expanded }: { project: ProjectInterface, hovered: boolean, expanded: boolean }) => {
  if(!expanded) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 justify-around">
        <ProjectType
          project={project}
          hovered={hovered} />
        <Ordinance
          project={project}
          hovered={hovered} />
        <Resolution
          project={project}
          hovered={hovered} />
      </div>

      <ProjectNotes project={project} />
    </div>
  )
}

const ProjectType = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  
  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'type'}
        variant={setIconVariant(project, hovered)}
        size={'small'} />
      <small className="underline">Type:</small>
      <small className="whitespace-nowrap">{project.type}</small>
    </div>
  )
}

const Ordinance = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'ordinance'}
        variant={setIconVariant(project, hovered)}
        size={'small'} />
      <small className="underline">Ordinance:</small>
      <OrdinanceLink project={project} />
    </div>
  )
}

const OrdinanceLink = ({ project }: { project: ProjectInterface }) => {
  const ordinanceLink = ZoningOrdinanceMap.get(project.ordinance)

  return (
    <a href={ordinanceLink} target="_blank"><small className="whitespace-nowrap hover:text-warning" title={`View ${ project.ordinance } Ordinance`}>{project.ordinance}</small></a>
  )
}

const Resolution = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  if(!project.Resolution) return null

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'resolution'}
        variant={setIconVariant(project, hovered)}
        size={'small'} />
      <small className="underline">Resolution:</small>
      <small className="whitespace-nowrap">{project.Resolution.resolution}</small>
    </div>
  )
}

const ProjectNotes = ({ project }: { project: ProjectInterface }) => {
  if(!project.notes) return null

  return (
    <small className="wrap text-center italic">"{project.notes}"</small>
  )
}

const Milestones = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {

  return (
    <div className="flex flex-col justify-between gap-6 m-auto p-3 w-fit lg:flex-row">
      <FirstMilestone
        project={project}
        hovered={hovered} />
      <SecondMilestone
        project={project}
        hovered={hovered} />
    </div>
  )
}

const FirstMilestone = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  const firstMilestone = project.Milestones?.find(milestone => milestone.number === 1)

  return (
    <div className="flex flex-col items-center" title="1st Milestone: Site Preperation">
      <Icons
        type={'firstMilestone'}
        variant={setMilestoneIconVariant(firstMilestone, project, hovered)}
        size={'large'} />
      <small className="-translate-y-1">1st Milestone</small>
      <Milestone milestone={firstMilestone} />
      <MilestoneExtension milestone={firstMilestone} />
    </div>
  )
}

const Milestone = ({ milestone }: { milestone: MilestoneInterface | undefined }) => {
  if(!milestone || milestone?.MilestoneExtension) return null

  return (
    <span className="whitespace-nowrap">{milestone.date}</span>
  )
}

const MilestoneExtension = ({ milestone }: { milestone: MilestoneInterface | undefined }) => {
  if(!milestone?.MilestoneExtension) return null

  return (
    <div className="relative flex gap-1 w-fit">
      <div className="whitespace-nowrap">{milestone.MilestoneExtension.date}<span className={styles.extension}>extended</span></div>
    </div>
  )
}

const SecondMilestone = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {

  const secondMilestone = project.Milestones?.find(milestone => milestone.number === 2)

  return (
    <div className="flex flex-col items-center" title="2nd Milestone: Vertical Construction">
      <Icons
        type={'secondMilestone'}
        variant={setMilestoneIconVariant(secondMilestone, project, hovered)}
        size={'large'} />
      <small className="-translate-y-1">2nd Milestone</small>
      <Milestone milestone={secondMilestone} />
      <MilestoneExtension milestone={secondMilestone} />
    </div>
  )
}

const VestingPeriods = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {

  return (
    <div className="flex justify-between gap-6 m-auto p-3 w-fit">
      <TenYearVesting
        project={project}
        hovered={hovered} />
      <FifteenYearVesting
        project={project}
        hovered={hovered} />
    </div>
  )
}

const TenYearVesting = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  const tenYearVesting = project.VestingPeriods?.find(period => period.type === "10Y")
  if(project.expired) return (
    <span className="text-3xl font-[play] italic uppercase font-bold">Expired</span>
  )

  if(!tenYearVesting) return null

  if(tenYearVesting.VestingStatus?.achieved) return (
    <span className="text-3xl font-[play] italic uppercase font-bold">Completed</span>
  )

  return (
    <div className="flex flex-col items-center text-center" title="10 year vesting period date">
      <Icons
        type={'tenYear'}
        variant={setVestingIconVariant(tenYearVesting, project, hovered)} 
        size={'large'} />
      <small>10 Year Vesting</small>
      <VestingPeriod period={tenYearVesting} />
      <VestingPeriodExtension period={tenYearVesting} />
    </div>
  )
}

const FifteenYearVesting = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  const fifteenYearVesting = project.VestingPeriods?.find(period => period.type === "15Y")

  if(!fifteenYearVesting) return null

  if(fifteenYearVesting.VestingStatus?.achieved) return (
    <span className="text-3xl font-[play] italic uppercase font-bold">Completed</span>
  )

  return (
    <div className="flex flex-col items-center text-center" title="15 year vesting period date">
      <Icons
        type={'fifteenYear'}
        variant={setVestingIconVariant(fifteenYearVesting, project, hovered)} 
        size={'large'} />
      <small>Fifteen Year Vesting</small>
      <VestingPeriod period={fifteenYearVesting} />
      <VestingPeriodExtension period={fifteenYearVesting} />
    </div>
  )
}

const VestingPeriod = ({ period }: { period: VestingPeriodInterface }) => {
  if(!period || period?.VestingExtension) return null

  return (
    <span className="whitespace-nowrap">{period.date}</span>
  )
}

const VestingPeriodExtension = ({ period }: { period: VestingPeriodInterface }) => {
  if(!period?.VestingExtension) return null

  return (
    <div className="relative flex gap-1 w-fit">
      <div className="whitespace-nowrap">{period.VestingExtension.date}<span className={styles.extension}>extended</span></div>
    </div>
  )
}

type DetailsBtnProps = { expanded: boolean, hovered: boolean, handleClick: () => void }

const DetailsBtn = (props: DetailsBtnProps) => {
  
  return (
    <button 
      type="button"
      onClick={props.handleClick}
      className="m-auto w-fit hover:cursor-pointer">
        <Icons
          type={props.expanded ? 'minimize' : 'expand'}
          variant={props.hovered ? 'light' : 'dark' }
          size={"small"} />
    </button> 
  )
}