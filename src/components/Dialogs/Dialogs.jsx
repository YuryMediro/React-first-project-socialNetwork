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
	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				<DialogItem name='Dima' id='1' />
				<DialogItem name='Yury' id='2' />
				<DialogItem name='Roma' id='3' />
				<DialogItem name='Sasha' id='4' />
			</div>
			<div className={s.messages}>
				<Message message='Hi' />
				<Message message='How' />
				<Message message='Why' />
				<Message message='Where' />
			</div>
		</div>
	)
}
export default Dialogs
