const SEND_MESSAGE = 'dialogs/SEND-MESSAGE' //4

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
}

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			let body = action.newMessageBody
			return {
				...state,
				messages: [...state.messages, { id: 5, message: body }],
			} //делаем поверхностную копию и уточняем те свойства которые надо переопределить

		default:
			return state
	}
}

export const sendMessageActionCreator = newMessageBody => ({
	type: SEND_MESSAGE,
	newMessageBody,
})

export default dialogsReducer
