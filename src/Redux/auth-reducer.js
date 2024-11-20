import { stopSubmit } from 'redux-form'
import { authAPI } from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false, //булево значение которое говорит не залогинен
}
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}

export const setAuthUserData = (id, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: { id, email, login, isAuth },
})

export const getAuthUserData = () => async dispatch => {
	let Response = await authAPI.me()
	if (Response.data.resultCode === 0) {
		//если в респонсе в дате сидит резалткод 0
		let { id, email, login } = Response.data.data //только в этом случае мы залогинены
		dispatch(setAuthUserData(id, email, login, true)) //и должны задиспачить эти данные
	}
}
export const login = (email, password, rememberMe) => async dispatch => {
	let Response = await authAPI.login(email, password, rememberMe)
	if (Response.data.resultCode === 0) {
		dispatch(getAuthUserData())
	} else {
		let message =
			Response.data.messages.length > 0
				? Response.data.messages[0]
				: 'Some error'
		dispatch(stopSubmit('login', { _error: message })) //redux-form
	}
}
export const logout = () => async dispatch => {
	let Response = await authAPI.logout()
	if (Response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false)) //когда вылогинились мы зануляем все что знали о себе
	}
}

export default authReducer
