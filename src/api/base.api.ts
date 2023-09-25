import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/react';
// import { RootState, store } from '../store/store';
import { tokenActions } from '../store/token.slice';
import { RootState, store } from '../store/store';
import * as timers from 'timers';


const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3001',
	prepareHeaders: (headers, { getState, endpoint }) => {
		const token = (getState() as RootState).token.id_token

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})
const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result?.error?.status === 401) {
		api.dispatch(tokenActions.removeToken())
	}

	return result
}

export const baseApi = createApi({
	reducerPath: 'base/api',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({})
})
