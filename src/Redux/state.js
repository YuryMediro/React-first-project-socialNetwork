let renderEntireTree = () => {
	console.log('state changed')
}

let state = {
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
}

window.state = state

export const addPost = () => {
	let newPost = {
		id: 5,
		message: state.profilePage.newPostText,
		likesCount: 0,
	}
	state.profilePage.posts.push(newPost)
	state.profilePage.newPostText = ''
	renderEntireTree(state)
}

export const updateNewPostText = newText => {
	state.profilePage.newPostText = newText
	renderEntireTree(state)
}

export const subscribe = observer => {
	renderEntireTree = observer              //observer это патерн
}

export default state
