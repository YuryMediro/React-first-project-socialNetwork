import React, { useEffect, useState } from 'react'
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = props => {
	let [editMode, setEditMode] = useState(false) //useState возвращает массив и мы
	//из этого массива достаем первый элемент и записываем в переменную editMode,
	//а второй элемент в переменную setEditMode
	let [status, setStatus] = useState(props.status)

	useEffect(() => {
		//вызываем useEffect, когда к нам приходит новый статус в props
		setStatus(props.status)
	}, [props.status])

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}
	const onStatusChange = e => {
		//При каждом напечатываение символа мы будем менять локальный state
		setStatus(e.currentTarget.value)
	}
	return (
		<div>
			{!editMode && (
				<div>
					<span onDoubleClick={activateEditMode}>
						{props.status || 'No status'}
					</span>
				</div>
			)}

			{editMode && ( //если у нас  editMode покажется input
				<div>
					<input
						onChange={onStatusChange}
						onBlur={deactivateEditMode} //это событие
						//срабатывает когда фокус в элементе а потом фокус уходит
						autoFocus={true}
						value={status}
					></input>
				</div>
			)}
		</div>
	)
}

export default ProfileStatusWithHooks
