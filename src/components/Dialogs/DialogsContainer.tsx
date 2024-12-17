import { actions } from '../../Redux/dialogs-reducer'
import { getDialogsPage } from '../../Redux/selectors/dialogs-selectors'
import { AppDispatch } from '../../Redux/redux-store'
import { Dialogs } from './Dialogs'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { withAuthRedirect } from '../../customHook/withAuthRedirect'
// import { useWithAuthRedirect } from '../../customHook/withAuthRedirect'

export const DialogsContainer = () => {

	// useWithAuthRedirect()

	const useAppDispatch: () => AppDispatch = useDispatch
	const dispatch = useAppDispatch()
	const dialogsPage = useSelector(getDialogsPage)

	const sendMessage = (newMessageBody: string) => {
		dispatch(actions.sendMessage(newMessageBody))
	}

	return <Dialogs sendMessage={sendMessage} dialogsPage={dialogsPage} />
}

export default withAuthRedirect(DialogsContainer)