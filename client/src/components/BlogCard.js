import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"
import moment from 'moment';

import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: '100%', // Adjust the width as needed for responsiveness
        maxWidth: '400px', // Set the maximum width as desired
        margin: 'auto',
        mt: 2,
        padding: 2,
        boxShadow: '5px 5px 10px #ccc',
        transition: 'box-shadow 0.3s', // Add a transition for hover effect
        '&:hover': {
          boxShadow: '10px 10px 20px #ccc',
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleEdit}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username?.charAt(0)} {/* Display the first character of the username */}
          </Avatar>
        }
        title={username}
        subheader={moment(time).format("Do MMMM YYYY, hh:mm A")}
      />
      <CardMedia
        component="img"
        width="100%" // Adjust the width for responsiveness
        height="auto" // Allow the height to adjust based on the aspect ratio
        style={{ objectFit: 'cover' }} // Use style instead of minWidth and object-fit
        src={image}
        alt="Blog Related Image"
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Title: {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}