import { ChangeEvent, useEffect, useState } from 'react'

type ProfileStatusWithHooksPropsType = {
	status: string
	updateStatus: (status: string) => void
}
export const ProfileStatusWithHooks = ({
	status,
	updateStatus,
}: ProfileStatusWithHooksPropsType) => {
	let [editMode, setEditMode] = useState(false) //useState возвращает массив и мы
	//из этого массива достаем первый элемент и записываем в переменную editMode,
	//а второй элемент в переменную setEditMode
	let [localStatus, setLocalStatus] = useState(status)

	useEffect(() => {
		//вызываем useEffect, когда к нам приходит новый статус в props
		setLocalStatus(status)
	}, [status])

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		updateStatus(localStatus)
	}
	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		//При каждом напечатываение символа мы будем менять локальный state
		setLocalStatus(e.currentTarget.value)
	}
	return (
		<div>
			{!editMode && (
				<div>
					<b>Status</b>:{' '}
					<span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
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

