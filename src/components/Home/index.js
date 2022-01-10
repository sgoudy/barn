import React from 'react'
import './index.css';

import {
    Grid,
    Typography,
    Box,
    Button
} from '@mui/material/';
import hs from '../../images/hs.jpg'

export default function Home() {
    return (
        <Grid container sx={{
              padding: 2,
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '100vh'
            }}>
        
              <Typography align="center" variant="h2">
                    Canterbrook Stables
                </Typography>
                <Box 
                component="img"
                src={hs} 
                    sx={{
                        maxHeight: 300,
                        maxWidth: 300
                        }}/>
                <Button 
                    variant="contained" 
                    href="/sign-in">
                        Enter
                </Button>             
        </Grid>
    )
}
