import React from 'react'
import s from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
	state = {
		//говорим что у классовой компоненты есть локальный state
		editMode: false, //в нем хранится editMode
		status: this.props.status,
	}

	activateEditMode = () => {
		this.setState({ editMode: true }) //setState-это асинхронный метод,
		//в него передаем объект, свойство которого перезапишут те свойства,
		//которые были в state
	}
	deactivateEditMode = () => {
		this.setState({ editMode: false }) //setState-это асинхронный метод,
		//в него передаем объект, свойство которого перезапишут те свойства,
		//которые были в state
		this.props.updateStatus(this.state.status)
	}

	onStatusChange = e => {
		this.setState({
			status: e.currentTarget.value,
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) { //если статус пришел и он не равен этому
			this.setState({ status: this.props.status })// тогда засинхронизируй state
		}
	}

	render() {
		return (
			<div>
				{!this.state.editMode && ( //если у нас не editMode покажется span
					<div>
						<span onDoubleClick={this.activateEditMode}>
							{this.props.status || 'No status'}
						</span>
					</div>
				)}

				{this.state.editMode && ( //если у нас  editMode покажется input
					<div>
						<input
							onChange={this.onStatusChange}
							autoFocus
							onBlur={this.deactivateEditMode} //это событие
							//срабатывает когда фокус в элементе а потом фокус уходит
							value={this.state.status}
						></input>
					</div>
				)}
			</div>
		)
	}
}

export default ProfileStatus
