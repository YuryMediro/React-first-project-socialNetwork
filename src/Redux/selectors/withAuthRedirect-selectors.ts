import { AppStateType } from '../redux-store'

export const getIsAuth = (state: AppStateType) => {
	return state.auth.isAuth
}
