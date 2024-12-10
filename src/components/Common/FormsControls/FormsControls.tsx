import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import s from './FormsControl.module.css'

type InputTypeProps = {
	input:
		| InputHTMLAttributes<HTMLInputElement>
		| TextareaHTMLAttributes<HTMLTextAreaElement>
	//в типе input лучше использовать более строгий тип, например,
	//InputHTMLAttributes<HTMLInputElement> или TextAreaHTMLAttributes<HTMLTextAreaElement>.
	meta: {
		touched: boolean
		error?: string // error может быть undefined
	}
	types: 'input' | 'textarea' // Уточняем, какие типы ожидаются
}

export const InputType = ({
	input,
	meta: { touched, error },
	types,
	...props
}: InputTypeProps) => {
	const hasError = touched && error
	return (
		<div className={`${s.formControl} ${hasError ? s.error : ''}`}>
			<div>
				{types === 'input' ? (
					<input
						{...(input as InputHTMLAttributes<HTMLInputElement>)}
						{...props}
					/>
				) : (
					<textarea
						{...(input as TextareaHTMLAttributes<HTMLTextAreaElement>)}
						{...props}
					/>
				)}
			</div>
			{hasError && <span>{error}</span>}
		</div>
	)
}
