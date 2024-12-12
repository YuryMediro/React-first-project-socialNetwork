import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { InputType } from '../../Common/FormsControls/FormsControls'
import s from './ProfileInfo.module.css'
import { ProfileType } from '../../../types/types'

export type ProfileDataFormValuesType = {
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	aboutMe: string
	contacts: { [key: string]: string }
}
type LoginFormOwnProps = {
	profile: ProfileType
}
const ProfileDataForm = ({
	handleSubmit,
	profile,
}: InjectedFormProps<ProfileDataFormValuesType, LoginFormOwnProps> &
	LoginFormOwnProps) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<button onClick={() => {}}>Save</button>
			</div>

			<div>
				<b>Full name</b>:
				<Field
					placeholder={'Full name'}
					name={'fullName'}
					component={InputType}
					types='input'
				/>
			</div>

			<div>
				<b>Looking for a job</b>:
				<Field
					component={InputType}
					types='input'
					name={'lookingForAJob'}
					type={'checkbox'}
				/>
			</div>

			<div>
				<b>My professional skills</b>:
				<Field
					placeholder={'My professional skills'}
					component={InputType}
					types='textArea'
					name={'lookingForAJobDescription'}
				/>
			</div>

			<div>
				<b>About me</b>:
				<Field
					placeholder={'About me'}
					component={InputType}
					types='textArea'
					name={'aboutMe'}
				/>
			</div>
			<div>
				<b>Сontacts</b>:
				{Object.keys(profile.contacts).map(key => {
					return (
						<div key={key} className={s.contacts}>
							<b>
								{key}:
								<Field
									placeholder={key}
									component={InputType}
									types='input'
									name={`contacts.${key}`}
								/>
							</b>
						</div>
					)
				})}
			</div>
		</form>
	)
}

export default reduxForm<ProfileDataFormValuesType, LoginFormOwnProps>({
	form: 'edit-profile',
})(ProfileDataForm)
