import styles from './Icons.module.css'
import { setIconSrc } from '.'

// Types
import { IconsProps } from './types'

function Icons({ type, variant, size }: IconsProps) {
  const src = setIconSrc(type, variant)

  if(src) {
    return (
      <img src={src} alt="icon" className={styles[size]} />
    )
  }
}

export default Icons