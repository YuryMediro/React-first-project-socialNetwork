import s from './ProfileInfo.module.css'

const ProfileData = props => {
	return (
		<div>
			{props.isOwner && (
				<div>
					<button onClick={props.goToEditMode}>Edit</button>
				</div>
			)}
			<div>
				<b>Full name</b>: {props.profile.fullName}
			</div>

			<div>
				<b>Looking for a job</b>:{props.profile.lookingForAJob ? ' yes' : ' no'}
			</div>

			<div>
				<b>My professional skills</b>:{props.profile.lookingForAJobDescription}
			</div>

			<div>
				<b>About me</b>: {props.profile.aboutMe}
			</div>
			<div>
				<b>Сontacts</b>:
				{Object.keys(props.profile.contacts).map(key => {
					return (
						<Contacts
							key={key}
							contactTitle={key}
							contactValue={props.profile.contacts[key]}
						/>
					)
				})}
			</div>
		</div>
	)
}
export const Contacts = props => {
	return (
		<div className={s.contacts}>
			<b>{props.contactTitle}</b>:{props.contactValue}
		</div>
	)
}

export default ProfileData
