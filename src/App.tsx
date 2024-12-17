import React, { useEffect, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from './Redux/app-reducer'
import { AppDispatch } from './Redux/redux-store'
import Preloader from './components/Common/Preloader/Preloader'
import { UsersPage } from './components/Users/UsersPage'
import { Login } from './components/Login/LoginPage'
import { HeaderContainer } from './components/Header/HeaderContainer'
import { Navbar } from './components/Navbar/Navbar'
import { getInitialized } from './Redux/selectors/app-selectors'

// Ленивый импорт для DialogsContainer
const DialogsContainer = React.lazy(
	() => import('./components/Dialogs/DialogsContainer')
)

const ProfileContainer = React.lazy(
	() => import('./components/Profile/ProfileContainer')
)

export const App = () => {
	const useAppDispatch: () => AppDispatch = useDispatch
	const dispatch = useAppDispatch()
	const initialized = useSelector(getInitialized)

	useEffect(() => {
		dispatch(initializeApp())
	}, [dispatch])

	if (!initialized) {
		return <Preloader />
	}

	return (
		<div className='app-wrapper'>
			<HeaderContainer />
			<Navbar />
			<div className='app-wrapper-content'>
				<Suspense
					fallback={
						<div>
							<Preloader />
						</div>
					}
				>
					<Routes>
						<Route path='/' element={<Navigate to='/profile' />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/profile/:userId?' element={<ProfileContainer />} />
						<Route path='/users' element={<UsersPage />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	)
}
