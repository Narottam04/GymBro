import { useSelector } from 'react-redux'
import { Navigate, Route, useLocation } from 'react-router'

function ProtectedRoute({children}) {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  if(!user){
    console.log(user)
    return <Navigate to="/"/>
  }

  return children
}

export default ProtectedRoute