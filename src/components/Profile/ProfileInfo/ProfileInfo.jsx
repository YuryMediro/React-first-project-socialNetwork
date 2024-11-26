import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/img/user.avif'

const ProfileInfo = props => {
	if (!props.profile) {
		//если нет profile
		return <Preloader /> //вернем прелодер
	}

	const onMainPhotoSelected = e => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}

	return (
		<div>
			<div>лого</div>
			<div className={s.descriptionBlock}>
				<img
					className={s.userPhoto}
					src={props.profile.photos.small || userPhoto}
				/>
				{props.isOwner && (
					<input
						type={'file'}
						name='file[]'
						multiple
						onChange={onMainPhotoSelected}
					/>
				)}
				<ProfileStatusWithHooks
					status={props.status}
					updateStatus={props.updateStatus}
				/>
			</div>
		</div>
	)
}

export default ProfileInfo
