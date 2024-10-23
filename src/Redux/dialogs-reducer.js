const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY' //2
const SEND_MESSAGE = 'SEND-MESSAGE' //4

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
	//3
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			state.newMessageBody = action.body
			return state
		//5
		case SEND_MESSAGE:
			let body = state.newMessageBody
			state.newMessageBody = ''
			state.messages.push({ id: 5, message: body })
			return state
		default:
			return state
	}
}

//6
export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
//7 дальше Dialogs.jsx
export const updateNewMessageBodyActionCreator = body => ({
	type: UPDATE_NEW_MESSAGE_BODY,
	body: body,
})

export default dialogsReducer
