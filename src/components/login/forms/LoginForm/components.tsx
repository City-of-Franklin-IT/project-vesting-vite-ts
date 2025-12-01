import { Link } from "react-router"
import useHandleLoginRedirect from "@/context/Auth/hooks/useHandleLoginRedirect"

export const LoginBtn = () => {
  const onClick = useHandleLoginRedirect()

  return (
    <button 
      type="submit"
      className="btn btn-lg btn-primary color-primary-content uppercase w-full"
      onClick={onClick}>
        Login
    </button>
  )
}

export const ProjectsLink = () => {

  return (
    <Link to={'/projects'} className="btn btn-lg btn-primary color-primary-content uppercase w-full">View Projects</Link>
  )
}