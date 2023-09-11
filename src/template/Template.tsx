import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { ApplicationBar } from './AppBar';


export const Template = () => {
	return <div>
		<ApplicationBar/>
		<Container maxWidth="sm" sx={{paddingTop: '50px'}}>
			<Box>
				<Outlet/>
			</Box>
		</Container>

	</div>
}
