import { Field, reduxForm } from 'redux-form'
import { InputType } from '../../Common/FormsControls/FormsControls'
import s from './ProfileInfo.module.css'

const ProfileDataForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
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
				{Object.keys(props.profile.contacts).map(key => {
					return (
						<div key={key} className={s.contacts}>
							<b>
								{key}:
								<Field
									placeholder={key}
									component={InputType}
									types='input'
									name={'contacts.' + key}
								/>
							</b>
						</div>
					)
				})}
			</div>
		</form>
	)
}

const ProfileDataFormReduxForm = reduxForm({
	form: 'edit-profile',
})(ProfileDataForm)

export default ProfileDataFormReduxForm
