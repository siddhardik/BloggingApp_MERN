import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    //get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userId");
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);
    
    console.log("After getting from database : " + blogs);
    
      blogs.map((blog) => {
        console.log(blog._id ,blog.title,blog.user.username);
      } 
      );

    
    return (
        <div>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              
              <BlogCard
                key={blog._id} // Make sure to add a unique key when rendering a list of elements
                isUser={true}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            ))
          ) : (
            <h1 style={{ textAlign: 'center', color: 'cyan' , marginTop :'80px'}}>You Haven't Created a Blog</h1>
          )}
        </div>
      );
};

export default UserBlogs;