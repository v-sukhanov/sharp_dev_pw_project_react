export interface ISignUpRequest {
	email: string;
	name: string;
	password: string;
	confirmPassword: string
}

export interface ISignUpResponse {
	id_token: string;
}

export interface ISignInRequest {
	email: string;
	password: string;
}

export interface ISignInResponse {
	id_token: string;
}



