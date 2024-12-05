const SEND_MESSAGE = 'dialogs/SEND-MESSAGE' //4

type DialogsType = {
	id: number
	name: string
}
type MessageType = {
	id: number
	message: string
}
let initialState = {
	dialogs: [
		{ id: 1, name: 'Dima' },
		{ id: 2, name: 'Yury' },
		{ id: 3, name: 'Roma' },
		{ id: 4, name: 'Sasha' },
	] as Array<DialogsType>,
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How' },
		{ id: 3, message: 'Why' },
		{ id: 4, message: 'Where' },
	] as Array<MessageType>,
}
export type InitialStateType = typeof initialState
const dialogsReducer = (
	state = initialState,
	action: any
): InitialStateType => {
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

type sendMessageActionCreatorType = {
	type: typeof SEND_MESSAGE
	newMessageBody: string
}
export const sendMessageActionCreator = (
	newMessageBody: string
): sendMessageActionCreatorType => ({
	type: SEND_MESSAGE,
	newMessageBody,
})

export default dialogsReducer
