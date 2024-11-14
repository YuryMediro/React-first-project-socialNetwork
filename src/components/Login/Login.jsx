import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, InputType } from '../Common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					placeholder={'Login'}
					name={'login'}
					component={InputType}
					types='input'
					validate={[required]}
				/>
				<p></p>
			</div>
			<div>
				<Field
					placeholder={'Password'}
					name={'password'}
					component={InputType}
					types='input'
					validate={[required]}
				/>
			</div>
			<div>
				<Field
					component={InputType}
					types='input'
					name={'remember'}
					type={'checkbox'}
				/>
				remember me
			</div>
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
		console.log(formData)
	}
	return (
		<di>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</di>
	)
}

export default Login
