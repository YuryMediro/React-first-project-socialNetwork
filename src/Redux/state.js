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
		if (action.type === 'ADD-POST') {
			let newPost = {
				id: 5,
				message: this._state.profilePage.newPostText,
				likesCount: 0,
			}
			this._state.profilePage.posts.push(newPost)
			this._state.profilePage.newPostText = ''
			this._callSubscriber(this._state)
		} else if (action.type === 'UPDATE-NEW-POST-TEXT') {
			this._state.profilePage.newPostText = action.newText
			this._callSubscriber(this._state)
		}
	},
}

export default store
window.state = store
