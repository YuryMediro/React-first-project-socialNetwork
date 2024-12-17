import Preloader from '../Common/Preloader/Preloader'
import { getIsFetching } from '../../Redux/selectors/users-selectors'
import { Users } from './users'
import { useSelector } from 'react-redux'

export const UsersPage = () => {
	const isFetching = useSelector(getIsFetching)
	return (
		<>
			{isFetching ? <Preloader /> : null}
			<Users />
		</>
	)
}
