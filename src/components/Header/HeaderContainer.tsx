import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../Redux/auth-reducer'
import { getIsAuth, getLogin } from '../../Redux/selectors/header-selector'
import { AppStateType } from '../../Redux/redux-store'

type MapStatePropsType = {
	isAuth: ReturnType<typeof getIsAuth>
	login: ReturnType<typeof getLogin>
}

type MapDispatchPropsType = {
	logout: () => void
}
type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

const HeaderContainer = ({
	isAuth,
	login,
	logout,
}: HeaderContainerPropsType) => {
	return <Header isAuth={isAuth} login={login} logout={logout} />
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		isAuth: getIsAuth(state),
		login: getLogin(state), //если залогинены, то покажется имя
	}
}

export default connect<
	MapStatePropsType,
	MapDispatchPropsType,
	{},
	AppStateType
>(mapStateToProps, { logout })(HeaderContainer)
