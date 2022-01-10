import React from 'react';
import { useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
    Grid,
    Typography,
    Button
} from '@mui/material/';

export default function Horse() {
    const {user} = useContext(AuthContext) 



    return (
        <Grid container sx={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '100vh'}}>
            {user
            ? <Typography variant="h6">
            
            Welcome, {user.firstName} </Typography> 
            : null}     
            <Button variant = "contained">
                Add Horse
            </Button>
               
        </Grid>
    )
}
