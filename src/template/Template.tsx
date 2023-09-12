import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { ApplicationBar } from './AppBar';
import { useAppSelector } from '../store/hooks';


export const Template = () => {
	const { id_token } = useAppSelector(x => x.token)
	const navigate = useNavigate();
	useEffect(() => {
		if (!id_token) {
			navigate({
				pathname: '/auth'
			})
		}
	}, [id_token])
	return <div>
		<ApplicationBar/>
		<Container maxWidth="sm" sx={{paddingTop: '50px'}}>
			<Box>
				<Outlet/>
			</Box>
		</Container>

	</div>
}
