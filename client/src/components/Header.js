// import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';
import '../css/Header.css';

const Header = () => {
    // Global State
    let isLogin = useSelector(state => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(isLogin);
    //State Normal 
    // const { value, setValue } = useState();

    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            toast.success("You have been logged out");
            localStorage.clear();
            navigate('/login');

        }
        catch (err) {
            console.log("Error: " + err)
        }
    }

    return (
        <AppBar position='sticky'>
            <Toolbar
                display={'flex'}
                sx={{
                    justifyContent: 'space-between', // Default for larger screens
                    '@media (max-width: 768px)': {
                        justifyContent: 'flex-start', // Adjust for screens smaller than 768px (e.g., mobile)
                    },
                }} >
                <Button sx={{ color: 'white' }} LinkComponent={Link} to="/blogs">Blog App</Button>

                {
                    isLogin && (
                        <Box display={'flex'} >
                            < Button sx={{ color: 'violet' }} LinkComponent={Link} to="/my-blogs">My Blogs</Button>
                            <Button sx={{ color: 'cyan' }} LinkComponent={Link} to="/create-blog">Create Blog</Button>
                        </Box>

                    )
                }





                <Box display={'flex'} >
                    {
                        !isLogin && (
                            <>
                                <Button sx={{ color: 'white' }} LinkComponent={Link} to='/login'>Login</Button>
                                <Button sx={{ color: 'white' }} LinkComponent={Link} to='/register'> Register</Button>

                            </>
                        )
                    }

                    {isLogin && (
                        <Button sx={{ color: 'white' }} LinkComponent={Link} to='/logout'
                            onClick={handleLogout}
                        >Logout</Button>
                    )}


                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header;