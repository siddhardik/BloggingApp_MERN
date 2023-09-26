import React from 'react';
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import {Link} from 'react-router-dom';
const Header = () => {
    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Typography varient='h4'>
                    Blog App
                </Typography>
                <Box display={'flex'} marginLeft='auto'>
                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/login'>Login</Button>
                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/register'> Register</Button>
                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/logout'>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;