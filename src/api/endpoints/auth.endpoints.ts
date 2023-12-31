import { baseApi } from '../base.api';
import { ISignInRequest, ISignInResponse, ISignUpRequest, ISignUpResponse } from '../../models/auth';


const _apiWithApiWithAuthEndpoint = baseApi.enhanceEndpoints({addTagTypes: ['Auth']}).injectEndpoints({
	endpoints: (build) => ({
		signUp: build.query<ISignUpResponse, ISignUpRequest>({
			query: (request: ISignUpRequest) => ({
				url: 'auth/signup',
				body: request,
				method: 'post'
			})
		}),
		signIn: build.query<ISignInResponse, ISignInRequest>({
			query: (request: ISignInRequest) => ({
				url: 'auth/signin',
				body: request,
				method: 'post'
			})
		})
	})
})

export const {useLazySignUpQuery, useLazySignInQuery} = _apiWithApiWithAuthEndpoint;
