import { ContactsType, ProfileType } from '../../../types/types'
import s from './ProfileInfo.module.css'

type ProfileDataPropsType = {
	isOwner: boolean
	goToEditMode: () => void
	profile: ProfileType
}

const ProfileData = ({
	isOwner,
	goToEditMode,
	profile,
}: ProfileDataPropsType) => {
	return (
		<div>
			{isOwner && (
				<div>
					<button onClick={goToEditMode}>Edit</button>
				</div>
			)}
			<div>
				<b>Full name</b>: {profile.fullName}
			</div>

			<div>
				<b>Looking for a job</b>:{profile.lookingForAJob ? ' yes' : ' no'}
			</div>

			<div>
				<b>My professional skills</b>:{profile.lookingForAJobDescription}
			</div>

			<div>
				<b>About me</b>: {profile.aboutMe}
			</div>
			<div>
				<b>Сontacts</b>:
				{Object.keys(profile.contacts).map(key => {
					//пробегаемся по ключам контактов
					return (
						<Contacts
							key={key}
							contactTitle={key}
							contactValue={profile.contacts[key as keyof ContactsType]}
						/>
					)
				})}
			</div>
		</div>
	)
}

type ContactsPropsType = {
	contactTitle: string
	contactValue: string
}

export const Contacts = ({ contactTitle, contactValue }: ContactsPropsType) => {
	return (
		<div className={s.contacts}>
			<b>{contactTitle}</b>:{contactValue}
		</div>
	)
}

export default ProfileData
