import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

let mapStateToPropsForRedirect = state => {
	return {
		isAuth: state.auth.isAuth, //взяли данные из state для редиректа
	}
}

export const withAuthRedirect = Component => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) return <Navigate to='/login' /> // если я не залогонен вернется окно с логином
			return <Component {...this.props} />
		}
	}

	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
		RedirectComponent
	)
	return ConnectedAuthRedirectComponent
}
//Создаем функцию которая будет принимать на входе Component, создаем внутри
//class (RedirectComponent ) или функциональную компоненту, внутри делаем логику
//Naigate и перерисовываем целевую компоненту, которую нам входе дали.
