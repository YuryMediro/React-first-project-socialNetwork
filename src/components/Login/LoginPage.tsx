import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { InputType } from '../Common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../Redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import s from '../Common/FormsControls/FormsControl.module.css'
import { getIsAuth } from '../../Redux/selectors/login-selectors'
import { AppStateType } from '../../Redux/redux-store'

// Типы для формы входа
type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}
type LoginFormValuesTypeKeys = keyof LoginFormValuesType // Ключи полей формы
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
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
	form: 'login',
})(LoginForm)

// Типы для основного компонента
type MapStatePropsType = {
	captchaUrl: string | null
	isAuth: boolean
}
type MapDispatchPropsType = {
	login: (
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: string
	) => void
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType

// Основной компонент входа
const Login = ({ captchaUrl, isAuth, login }: LoginPropsType) => {
	const onSubmit = (formData: LoginFormValuesType) => {
		login(
			formData.email,
			formData.password,
			formData.rememberMe,
			formData.captcha
		)
	}
	if (isAuth) {
		return <Navigate to={'/profile'} />
	}
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	)
}

// Связь с Redux
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	isAuth: getIsAuth(state),
	captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login })(Login)
