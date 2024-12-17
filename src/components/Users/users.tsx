import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { FilterType, follow, getUsersThunkCreator, unfollow } from '../../Redux/users-reducer'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import { UsersSearchForm } from './UsersSearchForm'
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalUsersCount,
	getUsers,
	getUsersFilter,
} from '../../Redux/selectors/users-selectors'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, AppStateType } from '../../Redux/redux-store'

export const Users = () => {
	const useAppDispatch: () => AppDispatch = useDispatch
	const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
	const dispatch = useAppDispatch()

	const users = useAppSelector(getUsers)
	const totalUsersCount = useAppSelector(getTotalUsersCount)
	const currentPage = useAppSelector(getCurrentPage)
	const pageSize = useAppSelector(getPageSize)
	const filter = useAppSelector(getUsersFilter)
	const followingInProgress = useAppSelector(getFollowingInProgress)

	useEffect(() => {
		dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
	}, [dispatch, currentPage, pageSize, filter])

	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
	}
	const onFiletChanged = (filter: FilterType) => {
		dispatch(getUsersThunkCreator(1, pageSize, filter))
	}

	const followUser = (userId: number) => {
		dispatch(follow(userId))
	}
	const unfollowUser = (userId: number) => {
		dispatch(unfollow(userId))
	}

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
						unfollow={unfollowUser}
						follow={followUser}
						key={u.id}
					/>
				))}
			</div>
		</div>
	)
}
