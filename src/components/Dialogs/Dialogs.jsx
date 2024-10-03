import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

const DialogItem = props => {
	return (
		<div className={`${s.dialog} ${s.active}`}>
			<NavLink to={/dialogs/ + props.id}>{props.name}</NavLink>
		</div>
	)
}
const Message = props => {
	return <div className={s.dialog}>{props.message}</div>
}

const Dialogs = props => {
	let dialogs = [
		{ id: 1, name: 'Dima' },
		{ id: 2, name: 'Yury' },
		{ id: 3, name: 'Roma' },
		{ id: 4, name: 'Sasha' },
	]

	let messages = [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How' },
		{ id: 3, message: 'Why' },
		{ id: 4, message: 'Where' },
	]

	let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id} />)

	let messagesElements = messages.map(m => <Message message={m.message} />)

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElements}</div>
			<div className={s.messages}>{messagesElements}</div>
		</div>
	)
}
export default Dialogs
