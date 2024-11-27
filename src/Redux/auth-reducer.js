import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false, //булево значение которое говорит не залогинен
	captchaUrl: null, // if null, then captcha is not required
}
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaUrlSuccess = captchaUrl => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl },
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
		if (Response.data.resultCode === 10) {
			dispatch(getCaptchaUrl())
		}
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

export const getCaptchaUrl = () => async dispatch => {
	let Response = await securityAPI.getCaptchaUrl()
	const captchaUrl = Response.data.url
	dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
