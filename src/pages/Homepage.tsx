import Chart from '../components/Chart';
import Helmet from '../components/Helmet';
import AsyncWrapper from '../layouts/AsyncWrapper';

function Homepage() {
	const isFetching = false;
	const data: any = { a: 1 };
	const error = null;

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={true}>
			<Helmet title='Homepage' description='Thống kê' />
			{Boolean(data) && (
				<>
					<Chart></Chart>
				</>
			)}
		</AsyncWrapper>
	);
}

export default Homepage;
