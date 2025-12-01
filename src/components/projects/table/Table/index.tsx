import styles from './Table.module.css'

// Types
import * as AppTypes from '@/context/types'

// Components
import { TableBody } from './components'

function Table({ projects }: { projects: AppTypes.ProjectInterface[] }) {

  return (
    <div className={styles.container}>
      <table className="w-full bg-primaryContent">
        <thead>
          <tr className="text-primary-content text-lg uppercase bg-primary">
            <th className="text-start indent-2 p-3 w-1/3">Name</th>
            <th className="p-3 w-1/3">Milestones</th>
            <th className="p-3 w-1/3">Vesting</th>
          </tr>
        </thead>
        <TableBody projects={projects} />
      </table>
    </div>
  )
}

export default Table