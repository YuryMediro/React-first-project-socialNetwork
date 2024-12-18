import {
	APIResponseType,
	ResultCodeForCaptchaEnum,
	ResultCodesEnum,
	instance,
} from './api'

type MeResponseDataType = {
	id: number
	email: string
	login: string
}

type LoginResponseDataType = {
	userId: number
}
type LogoutResponseType = {
	data: {}
	resultCode: ResultCodesEnum
	messages: Array<string>
}
export const authAPI = {
	me() {
		return instance
			.get<APIResponseType<MeResponseDataType>>(`auth/me`)
			.then(res => res.data)
	},
	login(
		email: string,
		password: string,
		rememberMe: boolean = false,
		captcha: null | string = null
	) {
		return instance
			.post<
				APIResponseType<
					LoginResponseDataType,
					ResultCodesEnum | ResultCodeForCaptchaEnum
				>
			>(`auth/login`, {
				email,
				password,
				rememberMe,
				captcha,
			})
			.then(res => res.data)
	},
	logout() {
		return instance
			.delete<LogoutResponseType>(`auth/login`)
			.then(res => res.data)
	},
}
