import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer, {
	withRouter,
} from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import React, { Component, Suspense } from 'react'
import { initializeApp } from './Redux/app-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Preloader from './components/Common/Preloader/Preloader'
import LoginPage from './components/Login/LoginPage'

// import DialogsContainer from './components/Dialogs/DialogsContainer'
const DialogsContainer = React.lazy(() =>
	import('./components/Dialogs/DialogsContainer')
)

// import UsersContainer from './components/Users/UsersContainer'
const UsersContainer = React.lazy(() =>
	import('./components/Users/UsersContainer')
)

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
					<Suspense fallback={<div><Preloader/></div>}>
						<Routes>
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/profile/:userId?' element={<ProfileContainer />} />
							<Route path='/users' element={<UsersContainer />} />
							<Route path='/login' element={<LoginPage />} />
						</Routes>
					</Suspense>
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
