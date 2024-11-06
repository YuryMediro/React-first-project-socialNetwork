import { connect } from 'react-redux'
import {
	follow,
	setCurrentPage,
	setTotalUsersCount,
	setUsers,
	tooggleIsFetching,
	unfollow,
} from '../../Redux/users-reducer'
import React from 'react'
import axios from 'axios'
import Users from './users'
import Preloader from '../Common/Preloader/Preloader'
import { usersAPI } from '../../api/api'

class UsersAPIContainer extends React.Component {
	componentDidMount() {
		this.props.tooggleIsFetching(true)

		usersAPI
			.getUsers(this.props.currentPage, this.props.pageSize)
			.then(data => {
				//после then быд response
				this.props.tooggleIsFetching(false)
				this.props.setUsers(data.items) //удаляем response
				this.props.setTotalUsersCount(data.totalCount) //удаляем response
			})
	}

	onPageChanged = pageNumber => {
		this.props.setCurrentPage(pageNumber)
		this.props.tooggleIsFetching(true)

		usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
			//после then быд response
			this.props.tooggleIsFetching(false)
			this.props.setUsers(data.items) //удаляем response
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

export default connect(mapStateToProps, {
	follow,
	unfollow,
	setUsers,
	setCurrentPage,
	setTotalUsersCount,
	tooggleIsFetching,
})(UsersAPIContainer)
