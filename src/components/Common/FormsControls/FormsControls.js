import React from 'react'
import s from './FormsControl.module.css'

export const InputType = ({ input, meta: { touched, error }, ...props }) => {
	const hasError = touched && error
	return (
		<div className={`${s.formControl} ${hasError ? s.error : ''}`}>
			<div>
				{props.types === 'input' ? (
					<input {...input} {...props} />
				) : (
					<textarea {...input} {...props} />
				)}
			</div>
			{hasError && <span>{error}</span>}
		</div>
	)
}

// export const Textarea = ({ input, meta, ...props }) => {
// 	const hasError = meta.touched && meta.error

// 	return (
// 		<div className={s.formControl + ' ' + (hasError ? s.error : '')}>
// 			<div>
// 				<textarea {...input} {...props} />
// 			</div>
// 			{hasError && <span>{meta.error}</span>}
// 		</div>
// 	)
// }
// export const Input = ({ input, meta, ...props }) => {
// 	const hasError = meta.touched && meta.error

// 	return (
// 		<div className={s.formControl + ' ' + (hasError ? s.error : '')}>
// 			<div>
// 				<input {...input} {...props} />
// 			</div>
// 			{hasError && <span>{meta.error}</span>}
// 		</div>
// 	)
// }
