import { getIsFetching } from '../../Redux/selectors/users-selectors'
import { Preloader } from '../Common/Preloader/Preloader'
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
