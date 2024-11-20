import profileReducer, {
	addPostActionCreator,
	deletePost,
} from './profile-reducer'
let state = {
	posts: [
		{ id: 1, message: 'Hi, how are you?', likesCount: 12 },
		{ id: 2, message: 'It`s my first post', likesCount: 6 },
	],
}
test('length of posts should be incremented', () => {
	//1. test data
	let action = addPostActionCreator('hihihih')
	//2. action
	let newState = profileReducer(state, action)
	//3.expectation
	expect(newState.posts.length).toBe(3)
})
test('delete', () => {
	let action = deletePost(1)

	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(1)
})
test('delete1', () => {
	let action = deletePost(100000)

	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(2)
})
