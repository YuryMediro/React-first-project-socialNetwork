import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import s from '../Common/FormsControls/FormsControl.module.css'
import { InputType } from '../Common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
// Типы для формы входа
export type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}
type LoginFormOwnProps = {
	captchaUrl: string | null
}

// Компонент формы входа
const LoginForm = ({
	handleSubmit,
	captchaUrl,
	error,
}: InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & //Использован тип InjectedFormProps из redux-form для свойств, автоматически добавляемых библиотекой.
	LoginFormOwnProps) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className={s.input}>
				<Field
					placeholder={'email'}
					name={'email'}
					component={InputType}
					types='input'
					validate={[required]}
				/>
			</div>
			<div className={s.input}>
				<Field
					placeholder={'password'}
					name={'password'}
					type='password'
					component={InputType}
					types='input'
					validate={[required]}
				/>
			</div>
			<div className={s.rememberMe}>
				<Field
					component={InputType}
					types='input'
					name={'rememberMe'}
					type={'checkbox'}
				/>
				remember me
			</div>
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && (
				<div>
					<Field
						placeholder={'Enter captcha'}
						name={'captcha'}
						component={InputType}
						types='input'
						validate={[required]}
					/>
				</div>
			)}

			{error && <div className={s.formSummaryError}>{error}</div>}
			<div className={s.btn}>
				<button>Login</button>
			</div>
		</form>
	)
}

// Обертка формы с redux-form
export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>(
	{
		form: 'login',
	}
)(LoginForm)
