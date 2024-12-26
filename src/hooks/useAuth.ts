import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export const useAuth = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )
  const isAdmin = user?.role === 'ADMIN'

  return {
    user,
    isAuthenticated,
    isAdmin,
  }
}
