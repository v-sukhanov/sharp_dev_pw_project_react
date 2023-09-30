import React, { useEffect, useState } from 'react';
import {
	IconButton, InputAdornment, Pagination,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead, TablePagination,
	TableRow, TextField
} from '@mui/material';
import { Replay } from '@mui/icons-material';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useLazyGetTransactionQuery } from '../../api/endpoints/transaction.endpoints';
import { ITransaction } from '../../models/transaction';
import { Search, Clear } from '@mui/icons-material';
import { useDebounce } from '../../shared/hooks/debounce';

export const TransactionsList = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [paginationData, setPaginationData] = useState<ITransaction[]>([]);
	const [getTransactionsRequest, {data}] = useLazyGetTransactionQuery()
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

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		const startIndex = page * rowsPerPage
		setPaginationData(data?.slice(startIndex, startIndex + rowsPerPage) ?? [])
	}, [page, data]);

	useEffect(() => {
		setPage(0)
	}, [rowsPerPage, data]);

	return <>
		<div className="mb-3 flex justify-between">
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment
							position="end"
							style={{ display: search ? undefined : 'none', cursor: 'pointer' }}
							onClick={() => setSearch('')}
						>
							<Clear />
						</InputAdornment>
					)
				}}
				value={search}
				onChange={e => setSearch(e.target.value)}
				className="w-80" id="trasaction-search" label="Username" variant="standard" />
			<TablePagination
				component="div"
				count={data?.length ?? 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>

		<TableContainer component={Paper}>
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
					{paginationData.map((row) => (
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
	</>
}
