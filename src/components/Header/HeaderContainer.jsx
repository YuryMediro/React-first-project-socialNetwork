import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../Redux/auth-reducer'
import { getIsAuth, getLogin } from '../../Redux/selectors/header-selector'

class HeaderContainer extends React.Component {
	render() {
		return <Header {...this.props} />
	}
}

let mapStateToProps = state => {
	return {
		isAuth: getIsAuth(state),
		login: getLogin(state), //если залогинены, то покажется имя
	}
}

export default connect(mapStateToProps, { logout })(HeaderContainer)
