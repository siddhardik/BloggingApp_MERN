import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {authActions} from '../redux/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //State
  const [inputs, setInputs] = useState(
    {
     
      email: "",
      password: ""
    }
  );

  //Handle inputs Change
  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }

    ));
  }
  const inputClear = () => {
    setInputs(
      {
        name: "",
        email: "",
        password: ""
      }
    )

  }

  //Handle onSubmit

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    inputClear();

    try {
      axios.post('/api/v1/users/login', {
        
        email: inputs.email,
        password: inputs.password
      }).then(function (response) {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem('userId',response.data?.user._id);
          dispatch(authActions.login())
          alert("User Logged In Successfully");
          //Redirect to home page 
          navigate("/");
        } else {
          alert("User Login failed.");
        }
      }).catch(function (error) {
        console.log("Error:", error.message);
        alert("An error occurred Login.");
      });
    } catch (error) {
      console.log("Try-catch block error:", error.message);
      alert("An error occurred.");
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>


        <Box

          maxWidth="450px"
          display="flex"

          flexDirection={"column"}
          alignItems={'center'}
          justifyContent={"centre"}
          margin="auto"
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          paddding={3}
          borderRadius={5}


        >
          <Typography
            variant='h4'
            padding={3}
            textAlign={"centre"}
            textTransform={"uppercase"}
          // sx ={
          //   {
          //     textTransform: "uppercase",
          //   }
          // }

          >Login🤷‍♂️</Typography>
          
          <TextField
            placeholder='Enter E-mail'
            name="email"
            value={inputs.email}
            margin="normal"
            type="email"
            onChange={handleChange}

            required

          />
          <TextField
            placeholder='Enter Strong password'
            name="password"
            margin="normal"
            value={inputs.password}
            type="password"
            onChange={handleChange}

            required

          />

          <Button
            type="submit"
            variant="contained"
            color="primary"

            // To write css in Tag use sx={{}}
            // To customize a specific part of a component, you can use the class name provided by Material UI inside the sx prop. 
            sx={{
              marginTop: 5,
              borderRadius: 3
            }}


          > Submit  </Button>

          <Button
            type="submit"

            sx={{
              marginTop: 2,

              marginBottom: 3,
            }}

            onClick={() => navigate("/register")}


          > Don't Have Account ? Register  </Button>

        </Box>
      </form>
    </>
  )
}

export default Login