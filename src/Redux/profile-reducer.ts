import { stopSubmit } from 'redux-form'
import { ResultCodesEnum } from '../api/api'
import { profileAPI } from '../api/profileAPI'
import { PhotosType, PostsType, ProfileType } from '../types/types'
import { BaseThunkType, InferActionsType } from './redux-store'

let initialState = {
	posts: [
		{ id: 1, message: 'Hi, how are you?', likesCount: 12 },
		{ id: 2, message: 'It`s my first post', likesCount: 6 },
	] as Array<PostsType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: '',
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

const profileReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'profile/ADD-POST': {
			let newPost = {
				id: 3,
				message: action.newPostText,
				likesCount: 0,
			}
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: '',
			}
		}
		case 'profile/SET_USER_PROFILE': {
			return {
				...state,
				profile: action.profile,
			}
		}
		case 'profile/SET_STATUS': {
			return {
				...state,
				status: action.status,
			}
		}
		case 'profile/DELETE_POST': {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId),
			}
		}
		case 'profile/SAVE_PHOTO_SUCCESS': {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as ProfileType,
			}
		}

		default:
			return state
	}
}

export const actions = {
	addPostActionCreator: (newPostText: string) =>
		({
			type: 'profile/ADD-POST',
			newPostText,
		} as const),
	setUserProfile: (profile: ProfileType) =>
		({
			type: 'profile/SET_USER_PROFILE',
			profile,
		} as const),
	setStatus: (status: string) =>
		({
			type: 'profile/SET_STATUS',
			status,
		} as const),
	deletePost: (postId: number) =>
		({
			type: 'profile/DELETE_POST',
			postId,
		} as const),
	savePhotoSuccess: (photos: PhotosType) =>
		({
			type: 'profile/SAVE_PHOTO_SUCCESS',
			photos,
		} as const),
}

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

export const getUserProfile =
	(userId: number): ThunkType =>
	async dispatch => {
		//thunk
		let data = await profileAPI.getProfile(userId)
		dispatch(actions.setUserProfile(data))
	}

export const getStatus =
	(userId: number): ThunkType =>
	async dispatch => {
		//thunk
		let data = await profileAPI.getStatus(userId)
		dispatch(actions.setStatus(data))
	}

export const updateStatus =
	(status: string): ThunkType =>
	async dispatch => {
		//thunk
		let data = await profileAPI.updateStatue(status)
		if (data.resultCode === ResultCodesEnum.Success) {
			dispatch(actions.setStatus(status))
		}
	}

export const savePhoto =
	(file: File): ThunkType =>
	async dispatch => {
		//thunk
		let data = await profileAPI.savePhoto(file)
		if (data.resultCode === ResultCodesEnum.Success) {
			dispatch(actions.savePhotoSuccess(data.data.photos))
		}
	}

export const saveProfile =
	(profile: string): ThunkType =>
	async (dispatch, getState) => {
		const userId = getState().auth.id //если сервак обновил, то запросим getUserProfile
		let data = await profileAPI.saveProfile(profile)
		if (data.resultCode === ResultCodesEnum.Success) {
			if (userId != null) {
				dispatch(getUserProfile(userId))
			} else {
				throw new Error('userId can`t be null')
			}
		} else {
			dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
			return Promise.reject(data.messages[0])
		}
	}

export default profileReducer
