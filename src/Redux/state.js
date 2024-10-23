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
			newMessageBody: '', //1
		},
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
		if (action.type === ADD_POST) {
			let newPost = {
				id: 5,
				message: this._state.profilePage.newPostText,
				likesCount: 0,
			}
			this._state.profilePage.posts.push(newPost)
			this._state.profilePage.newPostText = ''
			this._callSubscriber(this._state)
		} else if (action.type === UPDATE_NEW_POST_TEXT) {
			this._state.profilePage.newPostText = action.newText
			this._callSubscriber(this._state)
		}
		//3
		else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
			this._state.dialogsPage.newMessageBody = action.body
			this._callSubscriber(this._state)
		}
		//5
		else if (action.type === SEND_MESSAGE) {
			let body = this._state.dialogsPage.newMessageBody
			this._state.dialogsPage.newMessageBody = ''
			this._state.dialogsPage.messages.push({ id: 5, message: body })
			this._callSubscriber(this._state)
		}
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
