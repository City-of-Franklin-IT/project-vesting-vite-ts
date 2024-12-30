import styles from './Table.module.css'

// Types
import { TableProps } from './types'

// Components
import { TableBody } from './components'

function Table({ projects }: TableProps) {

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
        <TableBody projects={projects} />
      </table>
    </section>
  )
}

export default Table