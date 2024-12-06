import { ProfileType } from './../types/types'
import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '39309335-33f9-41cb-98c1-30a1a9a6282e',
	},
})

export const usersAPI = {
	getUsers(currentPage: number, pageSize: number) {
		return instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(Response => Response.data)
	},

	follow(userId: number) {
		return instance.post(`follow/${userId}`)
	},

	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`)
	},

	getProfile(userId: number) {
		console.warn('Obsolete method. Please profileAPI object.')
		return profileAPI.getProfile(userId)
	},
}

export const profileAPI = {
	getProfile(userId: number) {
		return instance.get(`profile/` + userId)
	},

	getStatus(userId: number) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatue(status: string) {
		return instance.put(`profile/status`, { status: status })
	},
	savePhoto(photoFile: any) {
		const formData = new FormData()
		formData.append('image', photoFile)
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	saveProfile(profile: string) {
		return instance.put(`profile`, profile)
	},
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`)
	},
}

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum ResultCodeForCaptchaEnum {
	CaptchaIsRequired = 10,
}
type MeResponseType = {
	data: { id: number; email: string; login: string }
	resultCode: ResultCodesEnum
	messages: Array<string>
}
type LoginResponseType = {
	data: { userId: number }
	resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
	messages: Array<string>
}
type LogoutResponseType = {
	data: {}
	resultCode: ResultCodesEnum
	messages: Array<string>
}
export const authAPI = {
	me() {
		return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
	},
	login(
		email: string,
		password: string,
		rememberMe: boolean = false,
		captcha: null | string = null
	) {
		return instance
			.post<LoginResponseType>(`auth/login`, {
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
