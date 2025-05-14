import useHandleLoginRedirect from "@/context/Auth/hooks/useHandleLoginRedirect"

export const LoginBtn = () => {
  const handleLoginRedirect = useHandleLoginRedirect()

  return (
    <button 
      type="submit"
      className="btn btn-lg btn-primary color-primary-content uppercase w-full"
      onClick={handleLoginRedirect}>
        Login
    </button>
  )
}