import { ResultCodesEnum } from '../api/api'
import { profileAPI } from '../api/profileAPI'
import { PhotosType, PostsType, ProfileType } from '../types/types'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

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

const profileReducer = (
	state = initialState,
	action: any
): InitialStateType => {
	switch (action.type) {
		case ADD_POST: {
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
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile,
			}
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status,
			}
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId),
			}
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as ProfileType,
			}
		}

		default:
			return state
	}
}

type AddPostActionCreatorActionType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPostActionCreator = (
	newPostText: string
): AddPostActionCreatorActionType => ({
	type: ADD_POST,
	newPostText,
})

type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (
	profile: ProfileType
): SetUserProfileActionType => ({
	type: SET_USER_PROFILE,
	profile,
})

type SetStatusActionType = {
	type: typeof SET_STATUS
	status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
	type: SET_STATUS,
	status,
})

type DeletePostActionType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
	type: DELETE_POST,
	postId,
})

type SavePhotoSuccessActionType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: PhotosType
}
export const savePhotoSuccess = (
	photos: PhotosType
): SavePhotoSuccessActionType => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
	//thunk
	let data = await profileAPI.getProfile(userId)
	dispatch(setUserProfile(data))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
	//thunk
	let data = await profileAPI.getStatus(userId)
	dispatch(setStatus(data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
	//thunk
	let data = await profileAPI.updateStatue(status)
	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(setStatus(status))
	}
}
export const savePhoto = (file: any) => async (dispatch: any) => {
	//thunk
	let data = await profileAPI.savePhoto(file)
	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(savePhotoSuccess(data.data.photos))
	}
}
export const saveProfile =
	(profile: string) => async (dispatch: any, getState: any) => {
		const userId = getState().auth.id //если сервак обновил, то запросим getUserProfile
		let data = await profileAPI.saveProfile(profile)
		if (data.resultCode === ResultCodesEnum.Success) {
			dispatch(getUserProfile(userId))
		}
	}

export default profileReducer
