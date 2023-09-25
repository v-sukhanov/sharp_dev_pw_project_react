import { IUserInfoResponse } from '../../models/user';
import { baseApi } from '../base.api';



const _apiWithApiWithUserEndpoints = baseApi.enhanceEndpoints({addTagTypes: ['User']}).injectEndpoints({
	endpoints: (build) => ({
		userInfo: build.query<IUserInfoResponse, void>({
			query: () => ({
				url: '/user/info',
				method: 'get'
			}),
			transformResponse: (response: IUserInfoResponse) => {
				return response;
			}
		})
	})
})

export const {useUserInfoQuery, useLazyUserInfoQuery} = _apiWithApiWithUserEndpoints;
