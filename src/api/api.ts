import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '39309335-33f9-41cb-98c1-30a1a9a6282e',
	},
})

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
	CaptchaIsRequired = 10,
}
export enum ResultCodeForCaptchaEnum {
	CaptchaIsRequired = 10,
}

export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D
	messages: Array<string>
	resultCode: RC
}
