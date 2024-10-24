import { connect } from 'react-redux'
import {
	sendMessageActionCreator,
	updateNewMessageBodyActionCreator,
} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'

let mapStateToProps = state => {
	return {
		dialogsPage: state.dialogsPage,
	}
}
let mapDispatchToProps = dispatch => {
	return {
		sendMessage: () => {
			dispatch(sendMessageActionCreator())
		},
		updateNewMessageBody: body => {
			dispatch(updateNewMessageBodyActionCreator(body))
		},
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
