import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators'
import { InputType } from '../../Common/FormsControls/FormsControls'

export type AddMessageFormValuesType = {
	newMessageBody: string
}

const AddMessageForm = ({
	handleSubmit,
}: InjectedFormProps<AddMessageFormValuesType>) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Field
					component={InputType}
					validate={[required, maxLengthCreator(50)]}
					name='newMessageBody'
					placeholder='Enter your message'
				/>
			</div>
			<div>
				<button type='submit'>Send</button>
			</div>
		</form>
	)
}

export default reduxForm<AddMessageFormValuesType>({
	form: 'dialogAddMessageForm',
})(AddMessageForm)
