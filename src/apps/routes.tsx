import React, { ReactElement, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import Layout from '../layouts';
import { PUBLIC_ROUTES } from './lazyLoading';
import LoginPage from '../pages/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hooks';
import { getMe } from '../redux/features/authSlice';

interface SuspenseWrapperProps {
	children: ReactElement;
}

const SuspenseWrapper = (props: SuspenseWrapperProps) => {
	return (
		<React.Suspense fallback={<Spinner />}>{props.children}</React.Suspense>
	);
};

function MainRoutes() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0 });
		// scroll to the top of the browser window when changing route
	}, [location]);
	const user = useSelector((state: RootState) => state.auth.currentUser);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getMe()).then((resp) => {
			if (!resp.payload) navigate('/login');
		});
	}, []);
	return (
		<Routes>
			<Route path='/login' element={<LoginPage></LoginPage>}></Route>

			<Route path='/' element={<Layout />}>
				{PUBLIC_ROUTES.map((route) => (
					<Route
						path={route.path}
						key={route.path}
						element={
							<SuspenseWrapper>
								<route.component />
							</SuspenseWrapper>
						}
					/>
				))}
			</Route>
		</Routes>
	);
}

export default MainRoutes;
