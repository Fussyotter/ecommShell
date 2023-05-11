import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Csrf_context } from '@/context/csrf_context';






export default function Signup() {
    const signUpNewUser = async (userData) => {
        const response = await fetch('http://localhost:8000/users/register/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrfToken,
					},
					credentials: 'include',

					body: JSON.stringify(userData),
				});
        const data = await response.json();
        console.log(data);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        signUpNewUser({
            username,
            password,
            email: email,

        });
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const { csrfToken } = useContext(Csrf_context);
  return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div>
				<Avatar></Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete='off'
								InputLabelProps={{ shrink: true }}
								name='username'
								required
								fullWidth
								id='username'
								label='Username'
								autoFocus
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='off'
								name='password'
								InputLabelProps={{ shrink: true }}
								required
								fullWidth
								id='password'
								label='Password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='email'
								name='email'
								required
								fullWidth
								id='email'
								label='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						
						
						
						
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
              <Link href="/">

						Sign Up
              </Link>
					</Button>
				</form>
			</div>
		</Container>
	);
};
            
