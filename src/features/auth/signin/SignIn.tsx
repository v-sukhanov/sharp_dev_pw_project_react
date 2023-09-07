import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Alert, AlertTitle, LoadingButton } from '@mui/lab';
import { StandardInput } from '../../../shared/components/StandardInput';
import * as yup from 'yup';
import { StandardPasswordInput } from '../../../shared/components/StandardPasswordInput';

const signInSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	password: yup.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
})

export const SignIn = () => {
	const isError = false
	const isLoading = false

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onChange",
		resolver: yupResolver(signInSchema)
	});

	const handleSignIn = (data: FieldValues) => {
		console.log('handle')
	}

	return (
		<form className="border rounded p-10 shadow bg-white  w-[500px]">
			<h2 className="mb-8 text-2xl">
				Sign in
			</h2>
			<StandardInput
				register={register('email', { required: true })}
				label="Email"
				error={errors?.email?.message?.toString()}
			/>
			<StandardPasswordInput
				register={register('password', { required: true })}
				label="Password"
				error={errors?.password?.message?.toString()}
			/>
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
			<LoadingButton onClick={handleSubmit(handleSignIn)} fullWidth loading={isLoading} variant="contained">
				Sign in
			</LoadingButton>
			<div className="mt-4">
				<span className="text-gray-500 text-sm">
					Need an account? <br/> <a href="/auth/signup" className="underline">Sign up</a>
				</span>
			</div>
		</form>
	)
}
