import { stopSubmit } from 'redux-form'

import { authAPI } from '../api/authAPI'
import { securityAPI } from '../api/securityAPI'
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from '../api/api'

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
	let meData = await authAPI.me()
	if (meData.resultCode === ResultCodesEnum.Success) {
		//если в респонсе в дате сидит резалткод 0
		let { id, email, login } = meData.data //только в этом случае мы залогинены
		dispatch(setAuthUserData(id, email, login, true)) //и должны задиспачить эти данные
	}
}

export const login =
	(email: string, password: string, rememberMe: boolean, captcha: any) =>
	async (dispatch: any) => {
		let loginData = await authAPI.login(email, password, rememberMe, captcha)
		if (loginData.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData())
		} else {
			if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
				dispatch(getCaptchaUrl())
			}
			let message =
				loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
			dispatch(stopSubmit('login', { _error: message })) //redux-form
		}
	}

export const logout = () => async (dispatch: any) => {
	let logoutData = await authAPI.logout()
	if (logoutData.resultCode === ResultCodesEnum.Success) {
		dispatch(setAuthUserData(null, null, null, false)) //когда вылогинились мы зануляем все что знали о себе
	}
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	let data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url
	dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
