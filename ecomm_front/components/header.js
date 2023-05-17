import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, TextField, Icon, IconButton, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '@/context/auth_context';

import Cart from './cart';

const Header = () => {
  const {currentUser} = useAuth();
	return (
		<AppBar position='sticky'>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingBottom: 3,
					paddingTop: 1,
					borderBottom: '2px solid black',
				}}>
				<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, px: 4 }}>
					<h2>Ecommerce Shell</h2>
					<TextField
						fullWidth
						variant='outlined'
						placeholder='Search'
						sx={{ bgcolor: 'white', py: 0.5, borderRadius: 1, ml: 2 }}
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
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
					}}>
            {currentUser ? (
              <div>Welcome, {currentUser}
              
              <Cart />
              </div>
            ) : (
					<Link href='/login' variant='body2'>
						{'Login'}
					</Link>)}
					<Link href='/signup' variant='body2'>
						{"Register"}
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
