import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'
import { Field, reduxForm } from 'redux-form'
import { InputType, Textarea } from '../Common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'

const Dialogs = props => {
	let state = props.dialogsPage

	let dialogsElements = state.dialogs.map(d => (
		<DialogItem name={d.name} id={d.id} key={d.id} />
	))
	let messagesElements = state.messages.map(m => (
		<Message message={m.message} key={m.id} />
	))

	let newMessageBody = state.newMessageBody

	let addNewMessage = values => {
		props.sendMessage(values.newMessageBody)
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElements}</div>
			<div className={s.messages}>
				<div>{messagesElements}</div>
			</div>
			<AddMessageFormRedux onSubmit={addNewMessage} />
		</div>
	)
}

const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					component={InputType}
					validate={[required, maxLengthCreator(50)]}
					name='newMessageBody'
					placeholder='Enter your message'
				/>
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
	AddMessageForm
)

export default Dialogs
