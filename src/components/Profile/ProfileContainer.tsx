import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import {
	getUserProfile,
	getStatus,
	updateStatus,
	savePhoto,
	saveProfile,
} from '../../Redux/profile-reducer'
import { useParams } from 'react-router-dom'
import { withAuthRedirect } from '../../customHook/withAuthRedirect'
import { compose } from 'redux'
import {
	getAuthorizedUserId,
	getProfile,
	getStatusProfile,
} from '../../Redux/selectors/profile-selectors'
import { AppDispatch, AppStateType } from '../../Redux/redux-store'
import { ProfileType } from '../../types/types'
import { Profile } from './Profile'
import { getIsAuth } from '../../Redux/selectors/withAuthRedirect-selectors'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

type MapStatePropsType = {
	profile: ReturnType<typeof getProfile>
	status: ReturnType<typeof getStatusProfile>
	authorizedUserId: ReturnType<typeof getAuthorizedUserId>
	isAuth: ReturnType<typeof getIsAuth>
}

type MapDispatchPropsType = {
	getUserProfile: (userId: number) => void
	getStatus: (userId: number) => void
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => void
}
type UsersContainerPropsType = MapStatePropsType &
	MapDispatchPropsType & { match: { params: { userId?: string } } }

export function withRouter<T>(Component: ComponentType<T>) {
	return (props: T) => {
		const match = { params: useParams() }
		return <Component {...props} match={match} />
	}
}

// export const ProfileContainer1 = () => {
// 	const useAppDispatch: () => AppDispatch = useDispatch
// 	const dispatch = useAppDispatch()
// 	const profile = useSelector(getProfile)
// 	const status = useSelector(getStatusProfile)
// 	const authorizedUserId = useSelector(getAuthorizedUserId)
// 	const isAuth = useSelector(getIsAuth)

// 	return (
// 		<Profile
// 			isOwner={!userId}
// 			profile={profile}
// 			status={status}
// 			updateStatus={updateStatus}
// 			savePhoto={savePhoto}
// 		/>
// 	)
// }

class ProfileContainer extends React.Component<UsersContainerPropsType> {
	refreshProfile() {
		let userId = this.props.match.params.userId
		if (!userId) {
			//если userId нет, то загрузим второго пользователя
			userId = this.props.authorizedUserId?.toString()
		}
		if (userId) {
			this.props.getUserProfile(+userId)
			this.props.getStatus(+userId)
		}
	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: UsersContainerPropsType) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			//если userID из текущих пропсов не равен iD из предыдущих пропсов, то запроси новые данные
			this.refreshProfile()
		}
	}

	render() {
		return (
			<Profile
				isOwner={!this.props.match.params.userId}
				{...this.props}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				savePhoto={this.props.savePhoto}
			/>
		)
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		profile: getProfile(state),
		status: getStatusProfile(state),
		authorizedUserId: getAuthorizedUserId(state),
		isAuth: getIsAuth(state),
	}
}

export default compose<ComponentType>(
	connect(mapStateToProps, {
		getUserProfile,
		getStatus,
		updateStatus,
		savePhoto,
		saveProfile,
	}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
