import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

// export type InitialStateType1 = {
// 	id: number | null
// 	email: string | null
// 	login: string | null
// 	isAuth: boolean
// 	captchaUrl: string | null
// }
let initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false, //булево значение которое говорит не залогинен
	captchaUrl: null as string | null, // if null, then captcha is not required
}
export type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}
type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
): SetAuthUserDataActionType => ({
	type: SET_USER_DATA,
	payload: { id, email, login, isAuth },
})

type GetCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (
	captchaUrl: string
): GetCaptchaUrlSuccessActionType => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl },
})

export const getAuthUserData = () => async (dispatch: any) => {
	let Response = await authAPI.me()
	if (Response.data.resultCode === 0) {
		//если в респонсе в дате сидит резалткод 0
		let { id, email, login } = Response.data.data //только в этом случае мы залогинены
		dispatch(setAuthUserData(id, email, login, true)) //и должны задиспачить эти данные
	}
}

export const login =
	(email: string, password: string, rememberMe: boolean, captcha: any) =>
	async (dispatch: any) => {
		let Response = await authAPI.login(email, password, rememberMe, captcha)
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

export const logout = () => async (dispatch: any) => {
	let Response = await authAPI.logout()
	if (Response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false)) //когда вылогинились мы зануляем все что знали о себе
	}
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	let Response = await securityAPI.getCaptchaUrl()
	const captchaUrl = Response.data.url
	dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
