import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/api'
import { UserType } from '../types/types'
import { AppStateType, InferActionsType } from './redux-store'
import { Dispatch } from 'redux'

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
	action: ActionsTypes
): InitialState => {
	switch (action.type) {
		case 'users/FOLLOW':
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: true }
					}
					return u
				}),
			}
		case 'users/UNFOLLOW':
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: false }
					}
					return u
				}),
			}
		case 'users/SET_USERS':
			return {
				...state,
				users: action.users,
			}
		case 'users/SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage,
			}
		case 'users/SET_TOTAL_USERS_COUNT':
			return {
				...state,
				totalUsersCount: action.count,
			}
		case 'users/TOGGLE_IS_FETCHING':
			return {
				...state,
				isFetching: action.isFetching,
			}
		case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
	followSuccess: (userId: number) =>
		({
			type: 'users/FOLLOW',
			userId,
		} as const),
	unfollowSuccess: (userId: number) =>
		({
			type: 'users/UNFOLLOW',
			userId,
		} as const),
	setUsers: (users: Array<UserType>) =>
		({
			type: 'users/SET_USERS',
			users,
		} as const), //action который устанавливает пользователей
	setCurrentPage: (currentPage: number) =>
		({
			type: 'users/SET_CURRENT_PAGE',
			currentPage,
		} as const),
	setTotalUsersCount: (totalUsersCount: number) =>
		({
			type: 'users/SET_TOTAL_USERS_COUNT',
			count: totalUsersCount,
		} as const),

	toggleIsFetching: (isFetching: boolean) =>
		({
			type: 'users/TOGGLE_IS_FETCHING',
			isFetching,
		} as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) =>
		({
			type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
			isFetching,
			userId,
		} as const),
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsersThunkCreator =
	(currentPage: number, pageSize: number): ThunkType =>
	async dispatch => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(currentPage)) //чтобы менялся стиль при переключение страниц
		let data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsersCount(data.totalCount))
	}

export const _followUnfollowFlow = async (
	dispatch: DispatchType,
	userId: number,
	apiMethod: any,
	actionCreator: (userId: number) => ActionsTypes
) => {
	dispatch(actions.toggleFollowingProgress(true, userId))
	let Response = await apiMethod(userId)
	if (Response.data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow =
	(userId: number): ThunkType =>
	async dispatch => {
		_followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.follow.bind(usersAPI),
			actions.followSuccess
		)
	}

export const unfollow =
	(userId: number): ThunkType =>
	async dispatch => {
		_followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.unfollow.bind(usersAPI),
			actions.unfollowSuccess
		)
	}

export default usersReducer
