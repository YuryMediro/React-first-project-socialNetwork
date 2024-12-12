import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { InputType } from '../../../Common/FormsControls/FormsControls'
import {
	maxLengthCreator,
	required,
} from '../../../../utils/validators/validators'

export type AddNewPostFormValuesType = {
	newPostText: string
}

const AddPostForm = ({
	handleSubmit,
}: InjectedFormProps<AddNewPostFormValuesType>) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Field
					component={InputType}
					placeholder={'Post message'}
					name='newPostText'
					validate={[required, maxLengthCreator(10)]}
				/>
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	)
}

export default reduxForm<AddNewPostFormValuesType>({
	form: 'ProfileAddNewPostForm',
})(AddPostForm)
