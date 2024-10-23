import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dialogs from './components/Dialogs/Dialogs'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import store from './Redux/store'

const App = props => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Navbar />
				<div className='app-wrapper-content'>
					<Routes>
						<Route
							path='/dialogs/*'
							element={
								<Dialogs
									store={props.store} //13 Дальше Dialogs.jsx
								/>
							}
						/>
						<Route
							path='/profile'
							element={
								<Profile
									profilePage={props.state.profilePage}
									dispatch={props.dispatch}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
