import { AppStateType } from "../redux-store"

export const getProfile = (state:AppStateType) => {
	return state.profilePage.profile
}
export const getStatusProfile = (state: AppStateType) => {
	return state.profilePage.status
}
export const getAuthorizedUserId = (state: AppStateType) => {
	return state.auth.id
}
