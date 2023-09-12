import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tokenReducer } from './token.slice';
import { baseApi } from '../api/base.api';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		token: tokenReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
		baseApi.middleware,
	])
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
setupListeners(store.dispatch)
