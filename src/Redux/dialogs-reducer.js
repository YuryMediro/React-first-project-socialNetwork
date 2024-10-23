const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY' //2
const SEND_MESSAGE = 'SEND-MESSAGE' //4

const dialogsReducer = (state, action) => {
	//3
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			state.newMessageBody = action.body
			return state
		//5 дальше в state.js
		case SEND_MESSAGE:
			let body = state.newMessageBody
			state.newMessageBody = ''
			state.messages.push({ id: 5, message: body })
			return state
		default:
			return state
	}
}

export default dialogsReducer
