import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import Provider from '../redux/provider';
import MainRoutes from './routes';
import ErrorBoundary from './ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';

function App() {
	useEffect(() => {
		document.body.classList.remove('load');
	}, []);

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Provider>
					<MainRoutes />
					<ToastContainer />
				</Provider>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
