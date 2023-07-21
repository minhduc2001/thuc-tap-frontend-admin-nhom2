import Helmet from '../components/Helmet';
import AsyncWrapper from '../layouts/AsyncWrapper';

function Homepage() {
	const isFetching = true;
	const data: any = {};
	const error = null;

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={Boolean(data)}>
			<Helmet title='Homepage' description='Thống kê' />
			{Boolean(data) && (
				<>
					<h1 className='mb-5 mt-10 text-xl'>Audio Book Stats</h1>
				</>
			)}
		</AsyncWrapper>
	);
}

export default Homepage;
