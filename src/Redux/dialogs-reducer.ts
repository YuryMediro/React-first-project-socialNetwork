import { InferActionsType } from './redux-store'

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

type ActionsTypes = InferActionsType<typeof actions>

const dialogsReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'dialogs/SEND-MESSAGE':
			let body = action.newMessageBody
			return {
				...state,
				messages: [...state.messages, { id: 5, message: body }],
			} //делаем поверхностную копию и уточняем те свойства которые надо переопределить

		default:
			return state
	}
}

export const actions = {
	sendMessageActionCreator: (newMessageBody: string) =>
		({
			type: 'dialogs/SEND-MESSAGE',
			newMessageBody,
		} as const),
}

export default dialogsReducer
