import { Helmet as HelmetWrapper } from 'react-helmet';

function Helmet(props: HelmetProps) {
	return (
		<HelmetWrapper>
			<title>Audio Book | {props.title}</title>
			<meta name='description' content={props.description} />
		</HelmetWrapper>
	);
}

Helmet.defaultProps = {
	title: 'Management',
	description: '',
};

export default Helmet;
