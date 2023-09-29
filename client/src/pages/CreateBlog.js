import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  console.log("User ka id from localStorage :" +id );
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
   
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("User ka id before create post :" +id );
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
  <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
      <Box
        width={{ xs: "90%", sm: "70%", md: "50%" }} // Adjust width for different screen sizes
        border={3}
        borderRadius={10}
        padding={{ xs: 2, sm: 3, md: 4 }} // Adjust padding for different screen sizes
        margin="auto"
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop={{ xs: 2, sm: 4, md: 6 }} // Adjust margin-top for different screen sizes
      >
        <Typography
          variant="h4" // Adjust typography for different screen sizes
          textAlign={"center"}
          fontWeight="bold"
          padding={{ xs: 2, sm: 3, md: 4 }} // Adjust padding for different screen sizes
          color="gray"
        >
          Create Your Post
        </Typography>
        <InputLabel
          sx={{
            mb: 1,
            mt: 2,
            fontSize: { xs: "20px", sm: "24px", md: "24px" }, // Adjust font size for different screen sizes
            fontWeight: "bold",
          }}
        >
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <InputLabel
          sx={{
            mb: 1,
            mt: 2,
            fontSize: { xs: "20px", sm: "24px", md: "24px" }, // Adjust font size for different screen sizes
            fontWeight: "bold",
          }}
        >
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <InputLabel
          sx={{
            mb: 1,
            mt: 2,
            fontSize: { xs: "20px", sm: "24px", md: "24px" }, // Adjust font size for different screen sizes
            fontWeight: "bold",
          }}
        >
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Button type="submit" color="primary" variant="contained">
          SUBMIT
        </Button>
      </Box>
    </form>
    </>
  );
};

export default CreateBlog;