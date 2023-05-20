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

export const Signup = () => {
  	const usernameRef = useRef();
	const passwordRef = useRef();

	const emailRef = useRef();
	const [error, setError] = useState('');
	const { csrfToken } = useContext(Csrf_context);


	function handleSubmit(e)  {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		fetch('http://localhost:8000/users/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			credentials: 'include',

			body: JSON.stringify({ username: username, password: password }),
		});
		const data =  response.json();
		console.log(data);
	};

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
								inputRef={usernameRef}
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
								inputRef={passwordRef}
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
								inputRef={emailRef}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						<Link href='/'>Sign Up</Link>
					</Button>
				</form>
			</div>
		</Container>
	);
}
