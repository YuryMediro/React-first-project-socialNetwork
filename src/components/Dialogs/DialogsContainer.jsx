import {
	sendMessageActionCreator,
	updateNewMessageBodyActionCreator,
} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = props => {
	//14
	let state = props.store.getState().dialogsPage

	// 9
	let onSendMessageClick = () => {
		props.store.dispatch(sendMessageActionCreator())
	}

	// 11 textarea засовывает сюда объект события e и с помощью e мы можем
	// достучаться до объекта с которым произошло событие с помощью target
	// Дальше index.js
	let onNewMessageChange = body => {
		props.store.dispatch(updateNewMessageBodyActionCreator(body))
	}

	return (
		<Dialogs
			updateNewMessageBody={onNewMessageChange}
			sendMessage={onSendMessageClick}
			dialogsPage={state}
		/>
	)
}
export default DialogsContainer
