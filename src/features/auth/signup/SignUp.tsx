import React from 'react';
import { Alert, AlertTitle, LoadingButton } from '@mui/lab';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';


const signUpSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	name: yup
		.string()
		.matches(/^([^0-9]*)$/, "Name should not contain numbers")
		.required("Name is a required field"),
	password: yup.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
	passwordConfirm: yup.string()
		.oneOf([yup.ref('password'), ''], 'Passwords must match')
})

export const SignUp = () => {
	const isError = false
	const isLoading = false

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onChange",
		resolver: yupResolver(signUpSchema)
	});

	const handleSignUp = (data: FieldValues) => {
		console.log('handlee')
	}

	return <form className="border rounded p-10 shadow bg-white  w-[500px]">
		<h2 className="mb-8 text-2xl">
			Sign up
		</h2>
		{
			isError &&
            <Alert className="mb-5" severity="error">
                <AlertTitle>Error</AlertTitle>
				{
					//@ts-ignore
					error?.data
				}
            </Alert>
		}

		<LoadingButton onClick={handleSubmit(handleSignUp)} fullWidth loading={isLoading} variant="contained">
			Sign up
		</LoadingButton>
		<div className="mt-4">
				<span className="text-gray-500 text-sm">
					Already have an account? <br/> <a href="/auth/signin" className="underline">Sign in</a>
				</span>
		</div>
	</form>
}
