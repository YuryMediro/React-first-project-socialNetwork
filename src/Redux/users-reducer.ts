import { usersAPI } from '../api/api'
import { UserType } from '../types/types'

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS '

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	totalUsersCount: 1,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>, //array of users id
}

type InitialState = typeof initialState

const usersReducer = (
	state = initialState,
	action: any
): InitialState => {
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
					: state.followingInProgress.filter(id => id !== action.userId), //если isFetching = false
				//пришла подписка, то фильтруем удаляем id пользователя, пропускаем только ту id которая не равна id которая пришла в action
			}
		default:
			return state
	}
}

type ActionsTypes =
	| FollowSuccessActionType
	| UnfollowSuccessActionType
	| SetUsersActionType
	| SetCurrentPageActionType
	| SetTotalUsersCountActionType
	| ToggleIsFetchingActionType
	| ToggleFollowingProgressActionType

type FollowSuccessActionType = {
	type: typeof FOLLOW
	userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({
	type: FOLLOW,
	userId,
})

type UnfollowSuccessActionType = {
	type: typeof UNFOLLOW
	userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
	type: UNFOLLOW,
	userId,
})

type SetUsersActionType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
	type: SET_USERS,
	users,
}) //action который устанавливает пользователей

type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (
	currentPage: number
): SetCurrentPageActionType => ({
	type: SET_CURRENT_PAGE,
	currentPage,
})

type SetTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	count: number
}
export const setTotalUsersCount = (
	totalUsersCount: number
): SetTotalUsersCountActionType => ({
	type: SET_TOTAL_USERS_COUNT,
	count: totalUsersCount,
})

type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (
	isFetching: boolean
): ToggleIsFetchingActionType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
})

type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}
export const toggleFollowingProgress = (
	isFetching: boolean,
	userId: number
): ToggleFollowingProgressActionType => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
})


export const getUsersThunkCreator =
	(currentPage: number, pageSize: number) => async (dispatch: any) => {
		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(currentPage)) //чтобы менялся стиль при переключение страниц
		let data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsersCount(data.totalCount))
	}

export const followUnfollowFlow = async (
	dispatch: any,
	userId: number,
	apiMethod: any,
	actionCreator: any
) => {
	dispatch(toggleFollowingProgress(true, userId))
	let Response = await apiMethod(userId)
	if (Response.data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(
		dispatch,
		userId,
		usersAPI.follow.bind(usersAPI),
		followSuccess
	)
}

export const unfollow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(
		dispatch,
		userId,
		usersAPI.unfollow.bind(usersAPI),
		unfollowSuccess
	)
}

export default usersReducer
