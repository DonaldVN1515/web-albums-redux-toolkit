import { configureStore } from '@reduxjs/toolkit';

import photoReducer from '../features/Photo/photoSlice';
import useReducer from './userSlice';

const rootReducer = {
	photos: photoReducer,
	user: useReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
