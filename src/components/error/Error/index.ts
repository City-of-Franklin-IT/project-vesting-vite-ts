import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

// Types
import { ErrorState } from "./types"

export const useHandleError = () => { // Handle error
  const [state, setState] = useState<ErrorState>({ countdown: 5 })

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prevState => ({ countdown: prevState.countdown - 1 }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if(state.countdown === 0) {
      navigate('/')
    }
  }, [state.countdown, navigate])

  return { countdown: state.countdown }
}