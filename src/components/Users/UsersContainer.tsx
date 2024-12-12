import { connect } from 'react-redux'
import {
	follow,
	unfollow,
	getUsersThunkCreator,
} from '../../Redux/users-reducer'
import React from 'react'
import Users from './users'
import Preloader from '../Common/Preloader/Preloader'
import { compose } from 'redux'
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../Redux/selectors/users-selectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../Redux/redux-store'

type MapStatePropsType = {
	currentPage: number
	pageSize: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgress: Array<number>
}
type MapDispatchPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	getUsers: (currentPage: number, pageSize: number) => void
}

type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersContainerPropsType> {
	componentDidMount() {
		let { currentPage, pageSize } = this.props
		this.props.getUsers(currentPage, pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		let { pageSize } = this.props
		this.props.getUsers(pageNumber, pageSize)
	}

	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChanged={this.onPageChanged}
					users={this.props.users}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					followingInProgress={this.props.followingInProgress}
				/>
			</>
		)
	}
}

// let mapStateToProps = state => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingInProgress: state.usersPage.followingInProgress,
// 	}
// }
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		getUsers: getUsersThunkCreator,
	})
)(UsersContainer)
