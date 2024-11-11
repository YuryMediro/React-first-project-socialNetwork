import Profile from './Profile'
import React from 'react'
import { connect } from 'react-redux'
import {
	getUserProfile,
	getStatus,
	updateStatus,
} from '../../Redux/profile-reducer'
import { useParams } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

export function withRouter(Children) {
	return props => {
		const match = { params: useParams() }
		return <Children {...props} match={match} />
	}
}
class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.match.params.userId
		if (!userId) {
			//если userId нет, то загрузим второго пользователя
			userId = 31810
		}
		this.props.getUserProfile(userId)
		this.props.getStatus(userId)
	}

	render() {
		return (
			<Profile
				{...this.props}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
			/>
		)
	}
}

let mapStateToProps = state => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
	}
}

export default compose(
	connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
	withRouter
	// withAuthRedirect
)(ProfileContainer)
