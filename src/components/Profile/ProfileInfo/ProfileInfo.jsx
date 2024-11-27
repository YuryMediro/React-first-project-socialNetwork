import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/img/user.avif'
import { useState } from 'react'
import ProfileDataForm from './ProfileDataForm'
import ProfileData from './ProfileData'

const ProfileInfo = props => {
	let [editMode, setEditMode] = useState(false)

	if (!props.profile) {
		//если нет profile
		return <Preloader /> //вернем прелодер
	}

	const onMainPhotoSelected = e => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}
	const onSubmit = formData => {
		props.saveProfile(formData)
		setEditMode(false)
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
					<input type={'file'} onChange={onMainPhotoSelected} />
				)}

				<ProfileStatusWithHooks
					status={props.status}
					updateStatus={props.updateStatus}
				/>

				{editMode ? (
					<ProfileDataForm
						initialValues={props.profile}
						profile={props.profile}
						onSubmit={onSubmit}
					/>
				) : (
					<ProfileData
						profile={props.profile}
						isOwner={props.isOwner}
						goToEditMode={() => {
							setEditMode(true)
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default ProfileInfo
