import React from 'react';
import Link from 'next/link';
import {
	AppBar,
	Box,
	Toolbar,
	TextField,
	Icon,
	IconButton,
	InputAdornment,
	Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


import { useAuth } from '@/context/auth_context';
import { Csrf_context } from '@/context/csrf_context';
import { Search_context } from '@/context/search_context';
import Cart from './cart';

const Header = () => {
	const { currentUser, setCurrentUser } = useAuth();
	const { csrfToken } = React.useContext(Csrf_context);
	const { setSearchTerm } = React.useContext(Search_context);
	const categories = ['test', 'hats', 'shirts', 'shoes', 'soaps']; // These are dummy categories that I'm using only for the purpose of this demo
	const [inputValue, setInputValue] = React.useState('');

	function handleLogout() {
		fetch('http://localhost:8000/users/logout/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			credentials: 'include',
		})
			.then((response) => {
				if (response.ok) {
					// Clear current user state
					setCurrentUser(null);
				} else {
					throw new Error('Logout failed');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
	const handleChange = (event) => {
		setInputValue(event.target.value);
	};
	const handleSearchSubmit = (event) => {
		event.preventDefault();
		setSearchTerm(inputValue);
	};
	return (
		<AppBar position='sticky'>
			<Toolbar
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingBottom: 3,
					paddingTop: 1,
					borderBottom: '2px solid black',
				}}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
						px: 4,
					}}>
					<h2>Ecommerce Shell</h2>
					<form onSubmit={handleSearchSubmit} style={{ flexGrow: 1 }}>
						<TextField
							fullWidth
							variant='outlined'
							placeholder='Search'
							sx={{ bgcolor: 'white', py: 0.5, borderRadius: 1, ml: 2 }}
							onChange={handleChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton type='submit'>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</form>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'flex-end',
							justifyContent: 'flex-end', 
							px: 4,
						}}>
						 {currentUser ? (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center' 
      }}
    >
      <Cart />
      <Typography variant='body2' sx={{ marginLeft: '1rem' }}>
        Welcome, {currentUser}
      </Typography>
      <Button
        size='small'
        variant='contained'
        onClick={handleLogout}
        sx={{ m: 1 }}
      >
        Logout
      </Button>
    </Box>
  ) : (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center' 
      }}
    >
      <Link href='/login' variant='body2'>
        Login
      </Link>
    </Box>
  )}
</Box>

<Box
  sx={{
    display: 'flex',
    justifyContent: 'flex-end', 
    px: 4,
  }}
>
  <Link href='/signup' variant='body2'>
    Register
  </Link>
</Box>
</Box>  	

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center', // Changed from 'flex-end' to 'center' for better alignment
						flexDirection: 'row', // Changed from 'column' to 'row' to align items horizontally
						p: 1,
						width: '100%',
						justifyContent: 'center', // Added to center the category buttons
						flexWrap: 'wrap', // Added in case there are many categories and they need to wrap to a new line
					}}>
					{categories.map((category) => (
						<Button
							size='small'
							variant='contained'
							onClick={() => setSearchTerm(category)}>
							{category}
						</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
