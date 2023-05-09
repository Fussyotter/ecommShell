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

//   const [state, send] = useMachine(toggleMachine);

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

const { csrfToken } = useContext(Csrf_context);

	function handleSubmit(e) {
		e.preventDefault();
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
			})
			.then((data) => {
				console.log(data);
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
							onChange={(e) => setUsername(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}>
							Sign In
						</Button>
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