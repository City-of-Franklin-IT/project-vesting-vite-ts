// Components
import Loading from '../../components/loading/Loading'
import React from 'react'

function HandleLoading({ isLoading, children }: { isLoading: boolean, children: React.ReactElement }) {
  if(isLoading) return <Loading />

  return (
    <>{children}</>
  )
}

export default HandleLoading