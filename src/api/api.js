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
}
