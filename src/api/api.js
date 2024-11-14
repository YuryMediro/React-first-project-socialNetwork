import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '39309335-33f9-41cb-98c1-30a1a9a6282e',
	},
})

export const usersAPI = {
	getUsers(currentPage, pageSize) {
		return instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(Response => Response.data)
	},

	follow(userId) {
		return instance.post(`follow/${userId}`)
	},

	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
	},

	getProfile(userId) {
		console.warn('Obsolete method. Please profileAPI object.')
		return profileAPI.getProfile(userId)
	},
}
export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/` + userId)
	},

	getStatus(userId) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatue(status) {
		return instance.put(`profile/status`, { status: status })
	},
}

export const authAPI = {
	me() {
		return instance.get(`auth/me`)
	},
	login(email, password, rememberMe = false) {
		return instance.post(`auth/login`, { email, password, rememberMe })
	},
	logout() {
		return instance.delete(`auth/login`)
	},
}
