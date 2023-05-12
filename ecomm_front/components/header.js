import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar } from '@mui/material';


const Header = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 4 }}>
        <nav>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Ecommerce Shell</h1>
            <div>
              <Link href='/login' variant='body2'>
                {"Login"}
              </Link>
            </div>
            <div>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </Box>
        </nav>
        <form>
          <input type='text' placeholder='Search' />
          <button type='submit'>Search</button>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
