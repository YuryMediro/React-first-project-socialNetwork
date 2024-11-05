import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'

const ProfileInfo = props => {
	if (!props.profile) {
		//если нет profile
		return <Preloader /> //вернем прелодер
	}

	return (
		<div>
			<div>лого</div>
			<div className={s.descriptionBlock}>
				<img src={props.profile.photos.small} />
				ava + desc
			</div>
		</div>
	)
}

export default ProfileInfo
