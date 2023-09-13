export interface ISignUpRequest {
	email: string;
	name: string;
	password: string;
	confirmPassword: string
}

export interface ISignUpResponse {
	token: string;
}

export interface ISignInRequest {
	email: string;
	password: string;
}

export interface ISignInResponse {
	token: string;
}



