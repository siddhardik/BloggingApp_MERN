
const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');

// Create user Registration user
exports.registerController = async (req, res) => {
    try {
        // Destructuring 

        const { username, email, password } = req.body;

        //Validation 
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all fields",
            });
        }
        //exisiting user
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: "user already exisits",
            });
        }
         
        const hashedPassword = await bcrypt.hash(password,10);
        
        //save new user
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "New User Created",
            // user:user,
            user
        });


    }
    catch (error) {
        console.log(error);

        return res.status(500).send({
            // 500 =>  Internal Server Error
            message: " Error in Register CallBack , Internal Server Error",
            success: false,
            error: error
        })
    }

}


// get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      return res.status(200).send({
        userCount: users.length,
        success: true,
        message: "all users data",
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get ALl Users",
        error,
      });
    }
  };


//Login 
exports.loginController = () => {
};



