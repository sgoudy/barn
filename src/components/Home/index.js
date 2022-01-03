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
        <Grid container>
        <Box
            sx={{
              my: 8,
              mx: 4,
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundImage: `url(${hs})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              justifyContent: 'space-around',
              height: '100vh'
            }}
          >
              <Typography variant="h2">
                    Canterbrook Stables
                </Typography>
                
                <Button 
                    variant="contained" 
                    href="/sign-in">
                        Enter
                </Button>  
          </Box>
           
        </Grid>
    )
}
