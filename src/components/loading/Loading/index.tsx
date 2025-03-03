import icon from '../../../assets/icons/loading/loading.svg'

function Loading() {
  return (
    <img src={icon} alt="loading icon" className="m-auto w-40 animate-pulse" />
  )
}

export default Loading