import { renderEntireTree } from '../render'

let state = {
	profilePage: {
		posts: [
			{ id: 1, message: 'Hi, how are you?', likesCount: 12 },
			{ id: 2, message: 'It`s my first post', likesCount: 6 },
		],
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

export let addPost = postMessage => {
	let newPost = {
		id: 5,
		message: postMessage,
		likesCount: 0,
	}
	state.profilePage.posts.push(newPost)
	renderEntireTree(state)
}

export default state
