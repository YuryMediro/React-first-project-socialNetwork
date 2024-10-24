import {
	sendMessageActionCreator,
	updateNewMessageBodyActionCreator,
} from '../../Redux/dialogs-reducer'

import StoreContext from '../../StoreContext'
import Dialogs from './Dialogs'

const DialogsContainer = () => {
	return (
		<StoreContext.Consumer>
			{store => {
				//14
				let state = store.getState().dialogsPage

				// 9
				let onSendMessageClick = () => {
					store.dispatch(sendMessageActionCreator())
				}

				// 11 textarea засовывает сюда объект события e и с помощью e мы можем
				// достучаться до объекта с которым произошло событие с помощью target
				// Дальше index.js
				let onNewMessageChange = body => {
					store.dispatch(updateNewMessageBodyActionCreator(body))
				}
				return (
					<Dialogs
						updateNewMessageBody={onNewMessageChange}
						sendMessage={onSendMessageClick}
						dialogsPage={state}
					/>
				)
			}}
		</StoreContext.Consumer>
	)
}
export default DialogsContainer
