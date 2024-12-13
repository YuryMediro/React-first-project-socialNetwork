import { Field, Form, Formik } from 'formik'
import { FilterType } from '../../Redux/users-reducer'

const usersSearchFormValidate = (values: any) => {
	const errors = {}

	return errors
}

type UserSearchFormPropsType = {
	onFiletChanged: (filter: FilterType) => void
}

type FormType = {
	term: string
	friend: string
}

export const UsersSearchForm = ({
	onFiletChanged,
}: UserSearchFormPropsType) => {
	const submit = (
		values: FormType,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		const filter: FilterType = {
			term: values.term,
			friend:
				values.friend === 'null'
					? null
					: values.friend === 'true'
					? true
					: false,
		}

		onFiletChanged(filter)
		setSubmitting(false)
	}

	return (
		<div>
			<h1>Any place in your app!</h1>
			<Formik
				initialValues={{ term: '', friend: 'null' }}
				validate={usersSearchFormValidate}
				onSubmit={submit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='term' />
						<Field name='friend' as='select'>
							<option value='null'>All</option>
							<option value='true'>Only followed</option>
							<option value='false'>Only unfollowed</option>
						</Field>
						<button type='submit' disabled={isSubmitting}>
							Find
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
