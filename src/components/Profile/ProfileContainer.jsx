import axios from 'axios'
import Profile from './Profile'
import React from 'react'
import { connect } from 'react-redux'
import { setUserProfile } from '../../Redux/profile-reducer'
import { useParams } from 'react-router-dom'

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
			userId = 2
		}
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
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

const WhitsUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setUserProfile })(
	WhitsUrlDataContainerComponent
)
