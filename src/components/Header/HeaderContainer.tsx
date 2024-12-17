import { logout } from '../../Redux/auth-reducer'
import { getIsAuth, getLogin } from '../../Redux/selectors/header-selector'
import { AppDispatch } from '../../Redux/redux-store'
import { Header } from './Header'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export const HeaderContainer = () => {
	const useAppDispatch: () => AppDispatch = useDispatch
	const dispatch = useAppDispatch()
	const isAuth = useSelector(getIsAuth)
	const login = useSelector(getLogin)

	const handleLogout = () => {
		dispatch(logout())
	}

	return <Header isAuth={isAuth} login={login} logout={handleLogout} />
}
