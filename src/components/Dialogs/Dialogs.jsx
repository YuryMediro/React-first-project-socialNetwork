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
	let dialogsData = [
		{ id: 1, name: 'Dima' },
		{ id: 2, name: 'Yury' },
		{ id: 3, name: 'Roma' },
		{ id: 4, name: 'Sasha' },
	]
	let messagesData = [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How' },
		{ id: 3, message: 'Why' },
		{ id: 4, message: 'Where' },
	]
	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				<DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
				<DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
				<DialogItem name={dialogsData[2].name} id={dialogsData[2].id} />
				<DialogItem name={dialogsData[3].name} id={dialogsData[3].id} />
			</div>
			<div className={s.messages}>
				<Message message={messagesData[0].message} id={messagesData[0].id} />
				<Message message={messagesData[1].message} id={messagesData[1].id} />
				<Message message={messagesData[2].message} id={messagesData[2].id} />
				<Message message={messagesData[3].message} id={messagesData[3].id} />
			</div>
		</div>
	)
}
export default Dialogs
