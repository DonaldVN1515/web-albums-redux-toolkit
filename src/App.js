import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';

// import MainPage from './features/Photo/pages/Main';
import AddEditPhoto from './features/Photo/pages/AddEdit';
import './App.scss';
import Header from './components/Header';
import Banner from './components/Banner';
import NotFound from './components/NotFound';

// Lazy load - Code splitting
const MainPhoto = React.lazy(() => import('./features/Photo/pages/Main'));

function App() {
	return (
		<div className='photo-app'>
			<Router>
				<Suspense fallback={<div>Loading ...</div>}>
					<Header />
					<Banner />

					<Routes>
						{/* SET DEFAULT ROUTE TO PATH="/photo" */}
						<Route path='/' element={<Navigate to='/photo' />} />

						{/* ROUTING */}
						<Route path='photo' element={<MainPhoto />} />
						<Route path='photo/add' element={<AddEditPhoto />} />
						<Route path='photo/:photoId' element={<AddEditPhoto />} />

						<Route path='*' element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
