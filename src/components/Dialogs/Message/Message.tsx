import s from './../Dialogs.module.css'

type MessagePropsTypy = {
	message: string
}

const Message = ({ message }: MessagePropsTypy) => {
	return <div className={s.dialog}>{message}</div>
}

export default Message
