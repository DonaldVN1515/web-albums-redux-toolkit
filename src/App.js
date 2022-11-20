import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import productApi from './api/productApi';
import './App.scss';
import { getMe } from './app/userSlice';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SignIn from './features/Auth/pages/SignIn';
import SignUp from './features/Auth/pages/SignUp';
// import MainPage from './features/Photo/pages/Main';
import AddEditPhoto from './features/Photo/pages/AddEdit';

// Lazy load - Code splitting
const MainPhoto = React.lazy(() => import('./features/Photo/pages/Main'));

// Configure Firebase.
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	// ...
};
firebase.initializeApp(config);

function App() {
	const [setProductList] = React.useState([]);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const fetchProductList = async () => {
			try {
				const params = {
					_page: 1,
					_limit: 10,
				};
				const response = await productApi.getAll(params);
				console.log(response);

				setProductList(response.data);
			} catch (error) {
				console.log('Failed to fetch product List: ', error);
			}
		};

		fetchProductList();
	}, [setProductList]);

	// Listen to the Firebase Auth state and set the local state.
	React.useEffect(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(async (user) => {
				if (!user) {
					// user logout, handle something here
					return;
				}
				console.log('Logged in user: ', user.displayName);

				const token = await user.getIdToken();
				console.log('Logged in user token: ', token);

				// Get me when signed in
				try {
					const action = getMe();

					const actionResult = await dispatch(action);

					const currentUser = unwrapResult(actionResult);

					console.log('[Log in currentUser]:  ', currentUser);
				} catch (error) {
					console.log('Failed to log in', error.message);
				}
			});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, [dispatch]);

	return (
		<div className='photo-app'>
			<Router>
				<Suspense fallback={<div>Loading ...</div>}>
					<Header />

					<Routes>
						{/* SET DEFAULT ROUTE TO PATH="/photo" */}
						<Route path='/' element={<Navigate to='/photo' />} />

						{/* ROUTING */}
						<Route path='sign-in' element={<SignIn />} />
						<Route path='sign-up' element={<SignUp />} />

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
