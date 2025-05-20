import styles from './BackToTopBtn.module.css'

function BackToTopBtn({ handleClick }: { handleClick: () => void }) {
  
  return (
    <button
      type="button" 
      onClick={() => handleClick()}
      className={styles.btn}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn