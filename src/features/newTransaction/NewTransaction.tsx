import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLazyCreateTransactionQuery, useLazyUsersQuery } from '../../api/endpoints/transaction.endpoints';
import { IUser } from '../../models/user';
import { useLazyUserInfoQuery, useUserInfoQuery } from '../../api/endpoints/user.endpoints';

export const NewTransaction = () => {

	const [postUserRequest] = useLazyUsersQuery()
	const [initialAmount, setInitialAmount] = useState(0);
	const [amount, setAmount] = useState(0);
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const [createTransactionRequest, {isLoading, isError}] = useLazyCreateTransactionQuery();
	const [getUserInfoRequest] = useLazyUserInfoQuery()
	const [showSuccess, setShowSuccess] = useState(false);
	const { data: userInfo } = useUserInfoQuery()


	const userChanged = (user: IUser | null) => {
		setSelectedUser(user)
	}

	const handleCreateTransaction = () => {
		if (!selectedUser) {
			return ;
		}
		createTransactionRequest({
			name: selectedUser.name,
			amount
		})
			.unwrap()
			.then(async () => {
				getUserInfoRequest();
				setShowSuccess(true);
				await new Promise(resolve => {
					setTimeout(() => { resolve('') }, 5000);
				})
				setShowSuccess(false);
			})
	}

	return <div>
		<Typography sx={{marginBottom: '10px'}}>
			Please select a user for the transaction
		</Typography>

		{
			selectedUser &&
            <div className="mt-10">
                <Typography sx={{opacity: .5}}>
                    recipient:
                </Typography>
                <Typography sx={{marginBottom: '25px'}} variant="h5">
					{selectedUser.name}
                </Typography>
                <LoadingButton
                    loading={isLoading}
                    disabled={amount < 1 || (userInfo?.balance ?? 0) < amount}
                    sx={{marginTop: '25px'}}
                    fullWidth
                    variant="contained"
                    onClick={handleCreateTransaction}
                >
                    Send
                </LoadingButton>
            </div>
		}
	</div>
}
