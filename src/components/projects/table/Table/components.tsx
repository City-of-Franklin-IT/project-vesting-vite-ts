import { useState } from "react"
import { useMsal } from "@azure/msal-react"
import { setIconVariant, ZoningOrdinanceMap, handleMilestoneStyle, handleVestingStyle, handleRowStyling, setMilestoneIconVariant, setVestingIconVariant } from './utils'
import styles from './Table.module.css'

// Types
import { MilestoneInterface, ProjectInterface, VestingPeriodInterface } from "@/context/types"

// Components
import Icons from "@/components/icons/Icons/Icons"
import { Link } from "react-router"

export const TableBody = ({ projects }: { projects: ProjectInterface[] }) => { // Projects table body

  return (
    <tbody>
      {projects.map((project, index) => {
        return (
          <TableRow
            key={`project-table-row-${ project.uuid }`}
            index={index}
            project={project} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ project, index }: { project: ProjectInterface, index: number }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  return (
    <tr 
      key={`table-row-${ project.uuid }`}
      onMouseEnter={() => setState(prevState => ({ ...prevState, hovered: true }))}
      onMouseLeave={() => setState(prevState => ({ ...prevState, hovered: false }))}
      className={handleRowStyling(project, index)}>
        <td>
          <ProjectCell
            project={project}
            hovered={state.hovered} />
        </td>
        <td>
          <Milestones
            project={project}
            hovered={state.hovered} />
        </td>
        <td>
          <VestingPeriods
            project={project}
            hovered={state.hovered} />
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

  // if(!activeAccount) return <span className="text-lg font-bold uppercase whitespace-wrap" title={`Update ${ project.name }`}>{project.name} // </span>

  return (
    <Link to={`/update/${ project.uuid }`} className="text-lg font-bold uppercase whitespace-wrap hover:text-warning" title={`Update ${ project.name }`}>{project.name} //</Link>
  )
}

const ProjectDetails = ({ project, hovered, expanded }: { project: ProjectInterface, hovered: boolean, expanded: boolean }) => {
  if(!expanded) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-around">
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
      <small>{project.type}</small>
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
    <a href={ordinanceLink} target="_blank"><small className="hover:text-warning" title={`View ${ project.ordinance } Ordinance`}>{project.ordinance}</small></a>
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
      <small>{project.Resolution.resolution}</small>
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
    <div className="flex justify-between gap-6 m-auto p-3 w-fit">
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
    <div className="flex flex-col items-center">
      <Icons
        type={'firstMilestone'}
        variant={setMilestoneIconVariant(firstMilestone, project, hovered)}
        size={'large'} />
      <Milestone
        milestone={firstMilestone}
        hovered={hovered} />
      <MilestoneExtension
        milestone={firstMilestone}
        hovered={hovered} />
    </div>
  )
}

const Milestone = ({ milestone, hovered }: { milestone: MilestoneInterface | undefined, hovered: boolean }) => {
  if(!milestone || milestone?.MilestoneExtension) return null

  return (
    <span className={handleMilestoneStyle(milestone, hovered)}>{milestone.date}</span>
  )
}

const MilestoneExtension = ({ milestone, hovered }: { milestone: MilestoneInterface | undefined, hovered: boolean }) => {
  if(!milestone?.MilestoneExtension) return null

  return (
    <div className="relative flex gap-1 w-fit">
      <div className={handleMilestoneStyle(milestone, hovered)}>{milestone.MilestoneExtension.date}<span className={styles.extension}>extended</span></div>
    </div>
  )
}

const SecondMilestone = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {

  const secondMilestone = project.Milestones?.find(milestone => milestone.number === 2)

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'secondMilestone'}
        variant={setMilestoneIconVariant(secondMilestone, project, hovered)}
        size={'large'} />
      <Milestone
        milestone={secondMilestone}
        hovered={hovered} />
      <MilestoneExtension
        milestone={secondMilestone}
        hovered={hovered} />
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

  if(!tenYearVesting) return null

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'tenYear'}
        variant={setVestingIconVariant(tenYearVesting, project, hovered)} 
        size={'large'} />
      <VestingPeriod
        period={tenYearVesting}
        hovered={hovered} />
      <VestingPeriodExtension
        period={tenYearVesting}
        hovered={hovered} />
    </div>
  )
}

const FifteenYearVesting = ({ project, hovered }: { project: ProjectInterface, hovered: boolean }) => {
  const fifteenYearVesting = project.VestingPeriods?.find(period => period.type === "15Y")

  if(!fifteenYearVesting) return null

  return (
    <div className="flex flex-col items-center">
      <Icons
        type={'fifteenYear'}
        variant={setVestingIconVariant(fifteenYearVesting, project, hovered)} 
        size={'large'} />
      <VestingPeriod
        period={fifteenYearVesting}
        hovered={hovered} />
      <VestingPeriodExtension
        period={fifteenYearVesting}
        hovered={hovered} />
    </div>
  )
}

const VestingPeriod = ({ period, hovered }: { period: VestingPeriodInterface, hovered: boolean }) => {
  if(!period || period?.VestingExtension) return null

  return (
    <span className={handleVestingStyle(period, hovered)}>{period.date}</span>
  )
}

const VestingPeriodExtension = ({ period, hovered }: { period: VestingPeriodInterface, hovered: boolean }) => {
  if(!period?.VestingExtension) return null

  return (
    <div className="relative flex gap-1 w-fit">
      <div className={handleVestingStyle(period, hovered)}>{period.VestingExtension.date}<span className={styles.extension}>extended</span></div>
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