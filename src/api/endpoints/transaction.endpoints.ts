import { baseApi } from '../base.api';
import { IUser, IUserInfoResponse, IUsersRequest } from '../../models/user';
import {
	ICreateTransactionRequest,
	ITransaction
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
		createTransaction: build.query<ITransaction, ICreateTransactionRequest>({
			query: (request: ICreateTransactionRequest) => ({
				url: `${PREFIX}/create`,
				body: request,
				method: 'post'
			}),
		}),
		getTransaction: build.query<ITransaction[], void>({
			query: () => ({
				url: `${PREFIX}/list`,
				method: 'get'
			})
		})
	})
})

export const {useLazyUsersQuery, useLazyCreateTransactionQuery, useGetTransactionQuery, useLazyGetTransactionQuery} = _apiWithTransactionsEndpoints;
