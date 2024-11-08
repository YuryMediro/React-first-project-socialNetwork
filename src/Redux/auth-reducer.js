import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'

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
				...action.data,
				isAuth: true, //если данные пришли, то залогинен
			}

		default:
			return state
	}
}

export const setAuthUserData = (id, email, login) => ({
	type: SET_USER_DATA,
	data: { id, email, login },
})

export const getAuthUserData = () => {
	return dispatch => {
		authAPI.me().then(Response => {
			if (Response.data.resultCode === 0) {
				//если в респонсе в дате сидит резалткод 0
				let { id, email, login } = Response.data.data //только в этом случае мы залогинены
				dispatch(setAuthUserData(id, email, login)) //и должны задиспачить эти данные
			}
		})
	}
}

export default authReducer
