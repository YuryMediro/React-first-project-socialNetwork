import { connect } from 'react-redux'
import { actions } from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getDialogsPage } from '../../Redux/selectors/dialogs-selectors'
import { AppStateType } from '../../Redux/redux-store'

let mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: getDialogsPage(state),
	}
}
// let mapDispatchToProps = dispatch => {
// 	return {
// 		sendMessage: newMessageBody => {
// 			dispatch(actions.sendMessage(newMessageBody))
// 		},
// 	}
// }

export default compose(
	connect(mapStateToProps, { sendMessage: actions.sendMessage }),
	withAuthRedirect
)(Dialogs)
