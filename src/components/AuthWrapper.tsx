import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/tools/slices'

const Protected = ({ children }: { children: JSX.Element }) => {
  if (!useAppSelector(state => state.user.logon)) {
    return <Navigate to={'/login'} replace state={'redirect'}/>
  }
  return children
}

export default Protected
