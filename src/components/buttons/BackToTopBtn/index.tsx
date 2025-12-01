import React from 'react'
import styles from './BackToTopBtn.module.css'

function BackToTopBtn({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  
  return (
    <button
      type="button" 
      onClick={onClick}
      className={styles.btn}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn