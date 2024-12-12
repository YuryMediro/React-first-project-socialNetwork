import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'

const Navbar = () => {
	return (
		<nav className={s.nav}>
			<div className={s.item}>
				<NavLink to='/profile'>Profile</NavLink>
			</div>
			<div className={`${s.item} ${s.active}`}>
				<NavLink to='/dialogs'>Messages</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/'>News</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/'>Music</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/users'>Find users</NavLink>
			</div>

			<div className={s.item}>
				<NavLink to='/'>Settings</NavLink>
			</div>
		</nav>
	)
}

export default Navbar
