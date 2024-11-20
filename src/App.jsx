import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer, {
	withRouter,
} from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import { Component } from 'react'
import { initializeApp } from './Redux/app-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Preloader from './components/Common/Preloader/Preloader'
import LoginPage from './components/Login/LoginPage'

class App extends Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className='app-wrapper'>
				<HeaderContainer />
				<Navbar />
				<div className='app-wrapper-content'>
					<Routes>
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/profile/:userId?' element={<ProfileContainer />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/login' element={<LoginPage />} />
					</Routes>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		initialized: state.app.initialized,
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App)
