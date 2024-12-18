import s from './Dialogs.module.css'
import { InitialStateType } from '../../Redux/dialogs-reducer'
import AddMessageForm, {
	AddMessageFormValuesType,
} from './AddMessageForm/AddMessageForm'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'

type DialogsPropsType = {
	dialogsPage: InitialStateType
	sendMessage: (messageText: string) => void
}

export const Dialogs = ({ dialogsPage, sendMessage }: DialogsPropsType) => {
	let dialogsElements = dialogsPage.dialogs.map(d => (
		<DialogItem name={d.name} id={d.id} key={d.id} />
	))
	let messagesElements = dialogsPage.messages.map(m => (
		<Message message={m.message} key={m.id} />
	))

	let addNewMessage = (values: AddMessageFormValuesType) => {
		sendMessage(values.newMessageBody)
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElements}</div>
			<div className={s.messages}>
				<div>{messagesElements}</div>
			</div>
			<AddMessageForm onSubmit={addNewMessage} />
		</div>
	)
}

