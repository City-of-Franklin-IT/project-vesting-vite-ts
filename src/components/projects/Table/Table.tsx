import { useState, useContext } from 'react'
import UserContext from '../../../context/User/UserContext'
import { setProjectCell, setMilestoneCell, setVestingCell, handleRowStyling } from '.'
import styles from './Table.module.css'

// Types
import { Project } from '../../../context/App/types'
import { TableProps, TableState } from './types'

function Table({ data }: TableProps) {
  const { user } = useContext(UserContext)

  const [state, setState] = useState<TableState>({ expanded: [], hovered: '' })

  return (
    <section className={styles.container}>
      <table className="w-full bg-primaryContent">
        <thead>
          <tr className={styles.headerRow}>
            <th className="text-start indent-2 p-3 w-1/3">Name</th>
            <th className="p-3 w-1/3">Milestones</th>
            <th className="p-3 w-1/3">Vesting</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj: Project, index: number) => {
            return (
              <tr 
                key={`table-row-${ obj.uuid }`}
                onMouseEnter={() => setState(prevState => ({ ...prevState, hovered: obj.uuid }))}
                onMouseLeave={() => setState(prevState => ({ ...prevState, hovered: '' }))}
                className={handleRowStyling(obj, index)}
                >
                <td>{setProjectCell(obj, state.hovered === obj.uuid, { state, setState, authenticated: user?.email ? true : false })}</td>
                <td>{setMilestoneCell(obj, state.hovered === obj.uuid)}</td>
                <td>{setVestingCell(obj, state.hovered === obj.uuid)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default Table