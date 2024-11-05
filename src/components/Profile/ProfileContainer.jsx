import axios from 'axios'
import Profile from './Profile'
import React from 'react'
import { connect } from 'react-redux'
import { setUserProfile } from '../../Redux/profile-reducer'

class ProfileContainer extends React.Component {
	componentDidMount() {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
			.then(Response => {
				this.props.setUserProfile(Response.data)
			})
	}

	render() {
		return <Profile {...this.props} profile={this.props.profile} />
	}
}

let mapStateToProps = state => {
	return {
		profile: state.profilePage.profile,
	}
}

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
