// import {useState} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Copyright from '../Copyright/index.js'

import {
    Avatar, 
    Button, 
    CssBaseline, 
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
} from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import didi from '../../images/didi.jpg';

const cookies = new Cookies()

const sessionExpires = Date.now() + 4320000 //milliseconds = 12 hours

export default function SignIn() {
    
    const navigate = useNavigate();

    const sendUserToHorsePage = person => {
        cookies.set('boarder', person, { expires: new Date(sessionExpires) })
        navigate(`/${person.id}/horse`)
      }

    const getPerson = (person) => {
        axios.get(`http://localhost:5000/record/${person._id}`)
        .then((res) => {
            console.log(res.data.user)
            sendUserToHorsePage(res.data.user)})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response);
            }
    })};
    


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);  
        axios.get("http://localhost:5000/record")
        .then((res) => {
            if (res.status !== 200) {
                console.log(res.message)
                // setInvalid(true)
                // setErrorMessage(res.message)
            } else {
                let people = res.data;
                people.forEach((person)=>{
                    if (person.email === data.get('email') && person.password === data.get('password')){
                        getPerson(person);
                    } else {
                        console.log('invalid')
                    }
                })
                
            }})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response);
            }
            })};

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${didi})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // href={`/horse/${name}`}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}