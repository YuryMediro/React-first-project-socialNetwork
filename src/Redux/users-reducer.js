import { usersAPI } from '../api/api'

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS '

let initialState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: true }
					}
					return u
				}),
			}
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: false }
					}
					return u
				}),
			}
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			}
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.count,
			}
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId] //если isFetching = true, то мы должны добавить в массив id
					: state.followingInProgress.filter(id => id != action.userId), //если isFetching = false
				//пришла подписка, то фильтруем удаляем id пользователя, пропускаем только ту id которая не равна id которая пришла в action
			}
		default:
			return state
	}
}

export const followSuccess = userId => ({ type: FOLLOW, userId })
export const unfollowSuccess = userId => ({ type: UNFOLLOW, userId })
export const setUsers = users => ({ type: SET_USERS, users }) //action который устанавливает пользователей
export const setCurrentPage = currentPage => ({
	type: SET_CURRENT_PAGE,
	currentPage,
})
export const setTotalUsersCount = totalUsersCount => ({
	type: SET_TOTAL_USERS_COUNT,
	count: totalUsersCount,
})
export const toggleIsFetching = isFetching => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
})
export const toggleFollowingProgress = (isFetching, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
})

export const getUsersThunkCreator =
	(currentPage, pageSize) => async dispatch => {
		dispatch(toggleIsFetching(true)) 
		let data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsersCount(data.totalCount))
	}

const followUnfollowFlow = async (
	dispatch,
	userId,
	apiMethod,
	actionCreator
) => {
	dispatch(toggleFollowingProgress(true, userId))
	let Response = await apiMethod(userId)
	if (Response.data.resultCode == 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = userId => async dispatch => {
	followUnfollowFlow(
		dispatch,
		userId,
		usersAPI.follow.bind(usersAPI),
		followSuccess
	)
}

export const unfollow = userId => async dispatch => {
	followUnfollowFlow(
		dispatch,
		userId,
		usersAPI.unfollow.bind(usersAPI),
		unfollowSuccess
	)
}

export default usersReducer
