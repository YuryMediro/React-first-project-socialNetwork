import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer '

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY' //2
const SEND_MESSAGE = 'SEND-MESSAGE' //4

let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'Hi, how are you?', likesCount: 12 },
				{ id: 2, message: 'It`s my first post', likesCount: 6 },
			],
			newPostText: '',
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Dima' },
				{ id: 2, name: 'Yury' },
				{ id: 3, name: 'Roma' },
				{ id: 4, name: 'Sasha' },
			],
			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'How' },
				{ id: 3, message: 'Why' },
				{ id: 4, message: 'Where' },
			],
			newMessageBody: '', //1 дальше dialogs-reducer.js
		},
		sidebar: {},
	},
	_callSubscriber() {
		console.log('state changed')
	},

	getState() {
		return this._state
	},
	subscribe(observer) {
		this._callSubscriber = observer //observer это патерн
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action)
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
		this._state.sidebar = sidebarReducer(this._state.sidebar, action)

		this._callSubscriber(this._state)
	},
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = text => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
})

//6
export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
//7 дальше Dialogs.jsx
export const updateNewMessageBodyActionCreator = body => ({
	type: UPDATE_NEW_MESSAGE_BODY,
	body: body,
})

export default store
window.state = store
