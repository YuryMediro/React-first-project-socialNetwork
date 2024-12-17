import preloader from '../../../assets/img/preloader.svg'

type PreloaderPropsType = {}

export const Preloader = ({}: PreloaderPropsType) => {
	return (
		<div>
			<img src={preloader} />
		</div>
	)
}

