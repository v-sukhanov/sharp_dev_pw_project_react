import { IUserInfoResponse } from '../../models/user';
import { baseApi } from '../base.api';



const _apiWithApiWithUserEndpoints = baseApi.enhanceEndpoints({addTagTypes: ['User']}).injectEndpoints({
	endpoints: (build) => ({
		userInfo: build.query<IUserInfoResponse, void>({
			query: () => ({
				url: '/api/protected/user-info',
				method: 'get'
			}),
			transformResponse: (response: { user_info_token: IUserInfoResponse }) => response.user_info_token
		})
	})
})

export const {useUserInfoQuery, useLazyUserInfoQuery} = _apiWithApiWithUserEndpoints;
