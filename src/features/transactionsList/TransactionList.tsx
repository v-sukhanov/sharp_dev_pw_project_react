import React, { useEffect } from 'react';
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import { Replay } from '@mui/icons-material';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useLazyGetTransactionQuery } from '../../api/endpoints/transaction.endpoints';


export const TransactionsList = () => {
	const [getTransactionsRequest, {data}] = useLazyGetTransactionQuery()
	useEffect(() => {
		getTransactionsRequest();
	}, [])
	const navigate = useNavigate();

	const handleRepeat = (name: string, amount: number) => {
		navigate({
			pathname: '../newTransaction',
			search: createSearchParams({
				name,
				amount: amount.toString()
			}).toString()
		})
	}

	return <TableContainer component={Paper}>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Date/Time</TableCell>
					<TableCell>Username</TableCell>
					<TableCell align="right">Amount</TableCell>
					<TableCell align="center">Repeat</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data?.map((row) => (
					<TableRow
						key={row.id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell component="th" scope="row">
							{row.created}
						</TableCell>
						<TableCell component="th" scope="row">
							{row.recipientUser.name}
						</TableCell>
						<TableCell align="right">{row.amount}</TableCell>
						<TableCell align="center">
							<IconButton onClick={() => handleRepeat(row.recipientUser.name, row.amount)}>
								<Replay/>
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
}
