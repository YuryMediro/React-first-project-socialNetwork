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
	newMessageBody: '',
}

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			return {
				...state,
				newMessageBody: action.body, //делаем поверхностную копию
				//и уточняем те свойства которые надо переопределить
			}

		case SEND_MESSAGE:
			let body = state.newMessageBody
			return {
				...state,
				newMessageBody: '',
				messages: [...state.messages, { id: 5, message: body }],
			} //делаем поверхностную копию и уточняем те свойства которые надо переопределить

		default:
			return state
	}
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageBodyActionCreator = body => ({
	type: UPDATE_NEW_MESSAGE_BODY,
	body: body,
})

export default dialogsReducer
