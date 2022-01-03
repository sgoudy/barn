import React from 'react'
import horses from './horses.js';
import {
    Grid,
} from '@mui/material/';

export default function Horse() {
    return (
        <Grid >
        {horses.map((horse, i)=>{
            return(
                <h2 key={i}>
            {horse.name}
            </h2>
            
            )
        })}
            
        </Grid>
    )
}
