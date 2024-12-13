import { FilterType } from '../../Redux/users-reducer'
import { UserType } from '../../types/types'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import { UsersSearchForm } from './UsersSearchForm'

type UsersProps = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	users: Array<UserType>
	followingInProgress: Array<number>
	unfollow: (userId: number) => void
	follow: (userId: number) => void
	onFiletChanged: (filter: FilterType) => void
}

let Users = ({
	totalUsersCount,
	pageSize,
	currentPage,
	onPageChanged,
	users,
	followingInProgress,
	unfollow,
	follow,
	onFiletChanged,
}: UsersProps) => {
	return (
		<div>
			<UsersSearchForm onFiletChanged={onFiletChanged} />
			<Paginator
				currentPage={currentPage}
				onPageChanged={onPageChanged}
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
			/>
			<div>
				{users.map(u => (
					<User
						user={u}
						followingInProgress={followingInProgress}
						unfollow={unfollow}
						follow={follow}
						key={u.id}
					/>
				))}
			</div>
		</div>
	)
}

export default Users
