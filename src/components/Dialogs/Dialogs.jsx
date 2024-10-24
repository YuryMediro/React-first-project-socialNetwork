import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'

const Dialogs = props => {
	//14
	let state = props.dialogsPage

	let dialogsElements = state.dialogs.map(d => (
		<DialogItem name={d.name} id={d.id} key={d.id} />
	))
	let messagesElements = state.messages.map(m => (
		<Message message={m.message} key={m.id} />
	))

	// 10
	let newMessageBody = state.newMessageBody

	// 9
	let onSendMessageClick = () => {
		props.sendMessage()
	}

	// 11 textarea засовывает сюда объект события e и с помощью e мы можем
	// достучаться до объекта с которым произошло событие с помощью target
	// Дальше index.js
	let onNewMessageChange = e => {
		let body = e.target.value
		props.updateNewMessageBody(body)
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElements}</div>
			<div className={s.messages}>
				<div>{messagesElements}</div>
				{/* 8 */}
				<div>
					<div>
						<textarea
							value={newMessageBody}
							onChange={onNewMessageChange}
							placeholder='Enter your message'
						></textarea>
					</div>
					<div>
						<button onClick={onSendMessageClick}>Send</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Dialogs
