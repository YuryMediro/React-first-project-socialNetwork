import { connect } from 'react-redux'
import {
	sendMessageActionCreator,
	
} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getDialogsPage } from '../../Redux/selectors/dialogs-selectors'

let mapStateToProps = state => {
	return {
		dialogsPage: getDialogsPage(state),
	}
}
let mapDispatchToProps = dispatch => {
	return {
		sendMessage: newMessageBody => {
			dispatch(sendMessageActionCreator(newMessageBody))
		},
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
