import React, { useEffect, useState, useContext, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Csrf_context } from '@/context/csrf_context';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth_context';


export const Login = () => {
  	const usernameRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const { csrfToken, updateCsrfToken } = useContext(Csrf_context);
	const { currentUser, setCurrentUser } = useAuth();
	const router = useRouter();

	function handleSubmit(e) {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		fetch('http://localhost:8000/users/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			credentials: 'include',
			body: JSON.stringify({ username: username, password: password }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Connecting problem');
				}
				const newCsrfToken = response.headers.get('CSRF-Token'); 
				console.log('New CSRF Token:', newCsrfToken);
				updateCsrfToken(newCsrfToken);
				setCurrentUser(username);
				
			})
			.then(() => {
				console.log('Logged in');
				router.push('/');

			})
			.catch((err) => {
				console.log(err);
				setError('Username or password Incorrect');
			});
	}

	return (
		<>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<form noValidate>
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
							autoFocus
							inputRef={usernameRef} // use inputRef instead of onChange
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							inputRef={passwordRef} // use inputRef instead of onChange
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Link href='/'>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}>
								Sign In
							</Button>
						</Link>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href='/signup' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
};
export default Login;
