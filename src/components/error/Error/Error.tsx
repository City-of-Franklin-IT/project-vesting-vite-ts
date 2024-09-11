import { useHandleError } from '.'
import styles from './Error.module.css'

// Components
import Icons from '../../icons/Icons/Icons'

// Types
import { ErrorProps } from './types'

function Error({ title, subtitle }: ErrorProps) {
  const { countdown } = useHandleError()

  return (
    <div className={styles.container}>
      <Icons
        type={'sadFace'}
        variant={'normal'}
        size={'extraLarge'} />
      <div className="flex flex-col gap-3 items-center">
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subTitle}>{subtitle} in <span className={styles.counter}>{countdown}</span> seconds</div>
      </div>
    </div>
  )
}

export default Error