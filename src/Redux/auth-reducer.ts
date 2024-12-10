import { stopSubmit } from 'redux-form'
import { authAPI } from '../api/authAPI'
import { securityAPI } from '../api/securityAPI'
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from '../api/api'
import { BaseThunkType, InferActionsType } from './redux-store'

let initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false, //булево значение которое говорит не залогинен
	captchaUrl: null as string | null, // if null, then captcha is not required
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

const authReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
		case 'auth/GET_CAPTCHA_URL_SUCCESS':
			return {
				...state,
				...action.payload,
			}

		default:
			return state
	}
}

export const actions = {
	setAuthUserData: (
		id: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	) =>
		({
			type: 'auth/SET_USER_DATA',
			payload: { id, email, login, isAuth },
		} as const),

	getCaptchaUrlSuccess: (captchaUrl: string) =>
		({
			type: 'auth/GET_CAPTCHA_URL_SUCCESS',
			payload: { captchaUrl },
		} as const),
}

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>> //BaseThunkType лежит в redux-store.js
//| ReturnType<typeof stopSubmit> - делаем так как тут нет такого action либо |FormAction

export const getAuthUserData = (): ThunkType => async dispatch => {
	let meData = await authAPI.me()
	if (meData.resultCode === ResultCodesEnum.Success) {
		//если в респонсе в дате сидит резалткод 0
		let { id, email, login } = meData.data //только в этом случае мы залогинены
		dispatch(actions.setAuthUserData(id, email, login, true)) //и должны задиспачить эти данные
	}
}

export const login =
	(
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: any
	): ThunkType =>
	async dispatch => {
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

export const logout = (): ThunkType => async dispatch => {
	let logoutData = await authAPI.logout()
	if (logoutData.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false)) //когда вылогинились мы зануляем все что знали о себе
	}
}

export const getCaptchaUrl = (): ThunkType => async dispatch => {
	let data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
