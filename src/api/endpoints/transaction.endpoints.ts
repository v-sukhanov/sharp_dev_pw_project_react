import { baseApi } from '../base.api';
import { IUser, IUserInfoResponse, IUsersRequest } from '../../models/user';
import {
	ICreateTransactionRequest,
	ICreateTransactionResponse,
	ICreateTransactionToken
} from '../../models/transaction';

const PREFIX = 'transactions';


const _apiWithTransactionsEndpoints = baseApi.enhanceEndpoints({addTagTypes: ['Transactions']}).injectEndpoints({
	endpoints: (build) => ({
		users: build.query<IUser[], IUsersRequest>({
			query: (request: IUsersRequest) => ({
				url: `${PREFIX}/userList`,
				method: 'get',
			})
		}),
		createTransaction: build.query<ICreateTransactionToken, ICreateTransactionRequest>({
			query: (request: ICreateTransactionRequest) => ({
				url: `${PREFIX}/create`,
				body: request,
				method: 'post'
			}),
		}),
		getTransaction: build.query<ICreateTransactionToken[], void>({
			query: () => ({
				url: `${PREFIX}/transactions`,
				method: 'get'
			}),
			transformResponse: (response: {trans_token: ICreateTransactionToken[]}) => response.trans_token.reverse().map(x => {
				return {
					...x,
					amount: x.amount * -1
				}
			})
		})
	})
})

export const {useLazyUsersQuery, useLazyCreateTransactionQuery, useGetTransactionQuery, useLazyGetTransactionQuery} = _apiWithTransactionsEndpoints;
