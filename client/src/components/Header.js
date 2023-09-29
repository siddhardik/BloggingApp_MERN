import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material';
import { Link ,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {authActions} from "../redux/store";
import toast from 'react-hot-toast';
const Header = () => {
    // Global State
    let isLogin = useSelector(state => state.isLogin);
    isLogin =isLogin || localStorage.getItem('userId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(isLogin);
    //State Normal 
    const { value, setValue } = useState();

    const handleLogout=()=>{
        try{
            dispatch(authActions.logout());
            toast.success("You have been logged out");
            localStorage.clear();
            navigate('/login');

        }
        catch(err){
            console.log("Error: " + err)
        }
    }

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Typography varient='h4'>
                    Blog App
                </Typography>

                {
                    isLogin && (
                        <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                            <Tabs textColor='inherit' value={value} onChange={
                                (e, value) => {
                                    setValue(value)
                                }
                                
                            }>
                                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />

                            </Tabs>
                        </Box>

                    )
                }





                <Box display={'flex'} marginLeft='auto'>
                    {
                        !isLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/login'>Login</Button>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/register'> Register</Button>

                            </>
                        )
                    }

                    {isLogin && (
                        <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/logout'
                            onClick={handleLogout}
                        >Logout</Button>
                    )}


                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;