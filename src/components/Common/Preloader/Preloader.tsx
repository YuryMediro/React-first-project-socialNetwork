import preloader from '../../../assets/img/preloader.svg'

type PreloaderPropsType = {}

let Preloader = ({}: PreloaderPropsType) => {
	return (
		<div>
			<img src={preloader} />
		</div>
	)
}

export default Preloader
