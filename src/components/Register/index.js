import axios from 'axios';
// import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
// import jwt from 'jwt-decode'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright/index.js'

const theme = createTheme();
// const cookies = new Cookies()

// const sessionExpires = Date.now() + 4320000 //milliseconds = 12 hours


export default function SignUp() {
    
    const navigate = useNavigate();
 
    // const sendUserHome = user => {
    //     const newUserToken = jwt.sign(user, 'be70416c-2bb4-11ec-8d3d-0242ac130003', {
    //       expiresIn: '12h',
    //     })
    //     cookies.set('boarder', newUserToken, { expires: new Date(sessionExpires) })
    //     navigate('/')
    //   }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            first: data.get('firstName'),
            last: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });
    
        const person = {
            first: data.get('firstName'),
            last: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password')
        }

        axios
        .post("http://localhost:5000/record/add", person)
        .then((res) => {
            if (res.status !== 200) {
                console.log(res.message)
                // setInvalid(true)
                // setErrorMessage(res.message)
            } else {
                navigate('/sign-in')
                // sendUserHome(person)
            }})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            });
        }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}