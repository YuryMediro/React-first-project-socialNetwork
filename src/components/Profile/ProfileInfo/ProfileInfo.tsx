import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/img/user.avif'
import { ChangeEvent, useState } from 'react'
import { ProfileType } from '../../../types/types'
import ProfileDataForm, { ProfileDataFormValuesType } from './ProfileDataForm'
import ProfileData from './ProfileData'

type ProfileInfoPropsType = {
	profile: ProfileType | null
	status: string
	isOwner: boolean
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => void
	updateStatus: (status: string) => void
}

const ProfileInfo = ({
	profile,
	status,
	isOwner,
	savePhoto,
	saveProfile,
	updateStatus,
}: ProfileInfoPropsType) => {
	let [editMode, setEditMode] = useState(false)

	if (!profile) {
		//если нет profile
		return <Preloader /> //вернем прелодер
	}

	const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			savePhoto(e.target.files[0])
		}
	}
	const onSubmit = (formData: ProfileDataFormValuesType) => {
		const profileData: ProfileType = {
			...profile,
			...formData,
			contacts: {
				...profile.contacts,
				...formData.contacts,
			},
		}
		saveProfile(profileData)
		setEditMode(false)
	}
	return (
		<div>
			<div>лого</div>
			<div className={s.descriptionBlock}>
				<img className={s.userPhoto} src={profile.photos.small || userPhoto} />
				{isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

				{editMode ? (
					<ProfileDataForm
						initialValues={profile}
						profile={profile}
						onSubmit={onSubmit}
					/>
				) : (
					<ProfileData
						profile={profile}
						isOwner={isOwner}
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
