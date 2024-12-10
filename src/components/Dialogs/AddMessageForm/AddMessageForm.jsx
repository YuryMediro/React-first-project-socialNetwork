import { Field, reduxForm } from 'redux-form'
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators'
import { InputType } from '../../Common/FormsControls/FormsControls'

const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					component={InputType}
					validate={[required, maxLengthCreator(50)]}
					name='newMessageBody'
					placeholder='Enter your message'
				/>
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	)
}

export default reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)
