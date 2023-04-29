import React, {useState} from "react";
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

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('');
//   const [state, send] = useMachine(toggleMachine);


export const Login = () => {
    
    
        React.useEffect(() => {
            fetch('http://localhost:8000/users/csrf/', {credentials: "include",
        })
        .then((res) => {
                let csrfToken = res.headers.get('X-CSRFToken')
            setscrf(csrfToken);
            console.log(csrfToken)
        }).catch(err => console.log(err))
        },[])
  const [csrfToken, setscrf] = useState('')


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch('http://localhost:8000/users/login/', {
    //         method: 'POST',
    //         credentials: "include",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': csrfToken,
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //         })
    //     }).then((res) => {
    //         if (res.status === 200) {
    //             window.location.href = 'http://localhost:3000/'
    //         } else {
    //             setError('Invalid Credentials')
    //         }
    //     }).catch(err => console.log(err))
    // }

    return (
        <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form  noValidate>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                // autoFocus
                // onChange={(e) => setUsername(e.target.value)}
            /> 
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                // id="password"
                autoComplete="current-password"
                // onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleSubmit}
            >
                Sign In
            </Button> */}
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
        
        </>
    )

}
export default Login;