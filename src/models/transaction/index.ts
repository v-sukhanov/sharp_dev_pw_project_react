
export interface ICreateTransactionRequest {
	userId: string;
	amount: number;
}

export interface ITransaction {
	id: string;
	created: string;
	amount: number;
	recipientUser: ICreateTransactionTokenUser
	senderUser: ICreateTransactionTokenUser
}

export interface ICreateTransactionTokenUser {
	name: string;
	id: string;
	email: string;
}

