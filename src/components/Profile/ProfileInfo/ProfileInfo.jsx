import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = props => {
	if (!props.profile) {
		//если нет profile
		return <Preloader /> //вернем прелодер
	}

	return (
		<div>
			<div>лого</div>
			<div className={s.descriptionBlock}>
				<img src={props.profile.photos.small} />
				<ProfileStatus
					status={props.status}
					updateStatus={props.updateStatus}
				/>
			</div>
		</div>
	)
}

export default ProfileInfo
