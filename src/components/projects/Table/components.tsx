import { useState, useContext } from "react"
import UserContext from "../../../context/User/UserContext"
import { setProjectCell, setMilestoneCell, setVestingCell, handleRowStyling } from "."

// Types
import { Dispatch, SetStateAction } from "react"
import { Project } from "../../../context/App/types"
import { TableState } from "./types"

export const TableBody = ({ projects }: { projects: Project[] }) => { // Projects table body
  const [state, setState] = useState<TableState>({ expanded: [], hovered: '' })

  return (
    <tbody>
      {projects.map((project, index) => {
        return (
          <TableRow
            key={`project-table-row-${ project.uuid }`}
            project={project}
            index={index}
            state={state}
            setState={setState} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ project, index, state, setState }: { project: Project, index: number, state: TableState, setState: Dispatch<SetStateAction<TableState>> }) => {
  const { user } = useContext(UserContext)

  return (
    <tr 
      key={`table-row-${ project.uuid }`}
      onMouseEnter={() => setState(prevState => ({ ...prevState, hovered: project.uuid }))}
      onMouseLeave={() => setState(prevState => ({ ...prevState, hovered: '' }))}
      className={handleRowStyling(project, index)}
      >
      <td>{setProjectCell(project, state.hovered === project.uuid, { state, setState, authenticated: user?.email ? true : false })}</td>
      <td>{setMilestoneCell(project, state.hovered === project.uuid)}</td>
      <td>{setVestingCell(project, state.hovered === project.uuid)}</td>
    </tr>
  )
}