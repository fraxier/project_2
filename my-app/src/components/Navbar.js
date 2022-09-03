import React from 'react';
import Logo from './Logo';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Container, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function Navbar({ user }) {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const pages = ['Dashboard', 'Hangul', 'History'];
	const settings = ['Profile'];

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Logo xs={'none'} md={'flex'} variant={'h6'} />

					{/* Side of bar with the burger icon and menu elements */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton size='large' aria-label='dashboard menu' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
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
							sx={{ display: { xs: 'block', md: 'none' } }}>
							{user && pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>
										<Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: purple[500] }}>
											{page}
										</Link>
									</Typography>
								</MenuItem>
							))}
              {!user && (<MenuItem key={1} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>
										Complete login <SentimentSatisfiedAltIcon color='primary'/>
									</Typography>
								</MenuItem>)
              }
						</Menu>
					</Box>
					<Logo xs={'flex'} md={'none'} variant={'h5'} flex='1.3' />

					{/* enumerates the array of pages into clickable buttons */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}>
						{user && pages.map((page) => (
							<Button key={page} onClick={handleCloseNavMenu} sx={{ mr: 2, my: 2, color: 'white', display: 'block' }}>
								<Link to={`/${page.toLowerCase()}`} color='white' style={{ textDecoration: 'none', color: 'white' }}>
									{page}
								</Link>
							</Button>
						))}
					</Box>

					{/* avatar + part of the appbar that shows account nav links */}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar id='asd' sx={{ bgcolor: purple[300], color: '#FFF' }} alt={user ? user.username : 'FUFU'}>
									{user ? <AccountCircleIcon/> : 'ㅋ'}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign='center'>{setting} - BETA</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
