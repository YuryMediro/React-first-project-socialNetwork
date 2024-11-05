import { connect } from 'react-redux'
import {
	followAC,
	setCurrentPageAC,
	setUsersAC,
	setUsersTotalCountAC,
	tooggleIsFetchingAC,
	unfollowAC,
} from '../../Redux/users-reducer'
import React from 'react'
import axios from 'axios'
import Users from './users'
import Preloader from '../Common/Preloader/Preloader'

class UsersAPIContainer extends React.Component {
	componentDidMount() {
		this.props.tooggleIsFetching(true)
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
			)
			.then(Response => {
				this.props.tooggleIsFetching(false)
				this.props.setUsers(Response.data.items)
				this.props.setTotalUsersCount(Response.data.totalCount)
			})
	}

	onPageChanged = pageNumber => {
		this.props.setCurrentPage(pageNumber)
		this.props.tooggleIsFetching(true)
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
			)
			.then(Response => {
				this.props.tooggleIsFetching(false)
				this.props.setUsers(Response.data.items)
			})
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
				/>
			</>
		)
	}
}

let mapStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
	}
}

let mapDispatchToProps = dispatch => {
	return {
		follow: userId => {
			dispatch(followAC(userId))
		},
		unfollow: userId => {
			dispatch(unfollowAC(userId))
		},
		setUsers: users => {
			dispatch(setUsersAC(users))
		},
		setCurrentPage: pageNumber => {
			dispatch(setCurrentPageAC(pageNumber))
		},
		setTotalUsersCount: totalCount => {
			dispatch(setUsersTotalCountAC(totalCount))
		},
		tooggleIsFetching: isFetching => {
			dispatch(tooggleIsFetchingAC(isFetching))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)
