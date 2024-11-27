import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { InputType } from '../Common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../Redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import s from '../Common/FormsControls/FormsControl.module.css'
import { getIsAuth } from '../../Redux/selectors/login-selectors'

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					placeholder={'email'}
					name={'email'}
					component={InputType}
					types='input'
					validate={[required]}
				/>
			</div>
			<div>
				<Field
					placeholder={'password'}
					name={'password'}
					type='password'
					component={InputType}
					types='input'
					validate={[required]}
				/>
			</div>
			<div>
				<Field
					component={InputType}
					types='input'
					name={'rememberMe'}
					type={'checkbox'}
				/>
				remember me
			</div>
			{props.captchaUrl && <img src={props.captchaUrl} />}
			{props.captchaUrl && (
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

			{props.error && <div className={s.formSummaryError}>{props.error}</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
	form: 'login',
})(LoginForm)

const Login = props => {
	const onSubmit = formData => {
		props.login(
			formData.email,
			formData.password,
			formData.rememberMe,
			formData.captcha
		)
	}
	if (props.isAuth) {
		return <Navigate to={'/profile'} />
	}
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	)
}
const mapStateToProps = state => ({
	isAuth: getIsAuth(state),
	captchaUrl: state.auth.captchaUrl,
})
export default connect(mapStateToProps, { login })(Login)
