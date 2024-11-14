import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { getAuthUserData, logout } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {
	componentDidMount() {
		this.props.getAuthUserData()
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

export default connect(mapStateToProps, { getAuthUserData, logout })(
	HeaderContainer
)
