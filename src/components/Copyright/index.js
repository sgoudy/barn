import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" target="_blank" href="https://www.linkedin.com/in/shelby-goudy/">
          Pelusa
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
