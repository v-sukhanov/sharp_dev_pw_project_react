import {
	AppBar,
	Avatar,
	Box, Button,
	Container,
	IconButton, Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

const pages = [
	{
		title: 'transactions',
		link: '/transactions'
	},
	{
		title: 'new transaction',
		link: '/newTransaction'
	}];
const settings = ['logout']

export const ApplicationBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event: any) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: any) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleNav= (nav: { title: string, link: string }) => {
		navigate(nav.link)
		handleCloseNavMenu();
	}

	const handleSelectUserMenu = (menu: string) => {
		if (menu === 'logout') {
			logout();
		}
		handleCloseUserMenu();
	}

	const navigate = useNavigate();


	const logout = () => {
		navigate({
			pathname: '/auth/signin'
		})
	}



	return <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontWeight: 700,
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Internal money
				</Typography>

				<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: 'block', md: 'none', xl: 'none' },
						}}
					>
						{pages.map((page) => (
							<MenuItem key={page.link} onClick={() => handleNav(page)}>
								<Typography textAlign="center">{page.title}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					{pages.map((page) => (
						<Button
							key={page.link}
							onClick={() => handleNav(page)}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							{page.title}
						</Button>
					))}
				</Box>
			</Toolbar>
		</Container>
	</AppBar>

}
