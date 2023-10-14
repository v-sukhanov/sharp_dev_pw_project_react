import React, { useEffect, useState } from 'react';
import {
	IconButton,
	InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
	TextField
} from '@mui/material';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useLazyGetTransactionQuery } from '../../api/endpoints/transaction.endpoints';
import { ICreateTransactionTokenUser, ITransaction } from '../../models/transaction';
import { Search, Clear, Replay } from '@mui/icons-material';
import { useDebounce } from '../../shared/hooks/debounce';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import moment from 'moment';

export const TransactionsList = () => {
	const [search, setSearch] = useState('');
	const [getTransactionsRequest, { data }] = useLazyGetTransactionQuery()
	const debounced = useDebounce(search);
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

	const columns: GridColDef[] = [
		{
			field: 'created', headerName: 'Date/Time', width: 200,
			valueGetter: (params: GridValueGetterParams<ITransaction>) => `${moment(params.row.created, moment.ISO_8601).local().fromNow()}`,
		},
		{
			field: 'recipientUser',
			headerName: 'Username',
			flex: 1,
			valueGetter: (params: GridValueGetterParams<ITransaction>) => `${params.row.recipientUser.name}`,
		},
		{
			field: 'amount',
			headerName: 'Amount',
			type: 'number',
		},
		{
			field: 'actions',
			headerName: 'Repeat',
			type: 'actions',
			width: 100,
			getActions: (params) => {
				return [<div>
					<IconButton onClick={() => handleRepeat(params.row.recipientUser.name, params.row.amount)}>
						<Replay/>
					</IconButton>
				</div>]
			}
		},
	];

	return <>
		<DataGrid
			rows={data ?? []}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: { page: 0, pageSize: 5 },
				},
			}}
			pageSizeOptions={[5, 10]}
			checkboxSelection
		/>
	</>
}
