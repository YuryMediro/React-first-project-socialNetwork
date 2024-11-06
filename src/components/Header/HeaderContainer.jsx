import React from 'react'
import Header from './Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuthUserData } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {
	componentDidMount() {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
				withCredentials: true, //передаем объект в котором сидят настройки запроса(наш логин,пароль)
			})
			.then(Response => {
				if (Response.data.resultCode === 0) { //если в респонсе в дате сидит резалткод 0
					let { id, email, login } = Response.data.data //только в этом случае мы залогинены
					this.props.setAuthUserData(id, email, login)  //и должны задиспачить эти данные
				}
			})
	}

	render() {
		return <Header {...this.props} />
	}
}

let mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login, //если залогинены, то покажется имя
	}
}

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer)
