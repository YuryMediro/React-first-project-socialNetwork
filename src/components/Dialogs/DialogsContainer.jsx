import { connect } from 'react-redux'
import {
	sendMessageActionCreator,
	updateNewMessageBodyActionCreator,
} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

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

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
