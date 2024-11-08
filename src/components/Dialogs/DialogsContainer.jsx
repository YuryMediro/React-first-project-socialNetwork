import { connect } from 'react-redux'
import {
	sendMessageActionCreator,
	updateNewMessageBodyActionCreator,
} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

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
let AuthRedirectComponent = withAuthRedirect(Dialogs) //

const DialogsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthRedirectComponent)

export default DialogsContainer
