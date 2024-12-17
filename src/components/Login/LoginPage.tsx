import { login } from '../../Redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import { getCaptchaUrl, getIsAuth } from '../../Redux/selectors/login-selectors'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/redux-store'
import { LoginFormValuesType, LoginReduxForm } from './LoginForm'

// Основной компонент входа
export const Login = () => {
	const useAppDispatch: () => AppDispatch = useDispatch
	const dispatch = useAppDispatch()
	const isAuth = useSelector(getIsAuth)
	const captchaUrl = useSelector(getCaptchaUrl)

	const onSubmit = (formData: LoginFormValuesType) => {
		dispatch(
			login(
				formData.email,
				formData.password,
				formData.rememberMe,
				formData.captcha
			)
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
