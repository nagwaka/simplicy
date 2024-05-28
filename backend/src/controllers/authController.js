//signup, login, logout
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const dotenv = require('../.env')




const signup = async (req, res) => {
    try{
        const { fullName, email, role, region, password } = req.body
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            res.status(400).json({message :'Email already exists. Please try a new Email'})
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //creating new user
        const newUser = new User({
            fullName,
            email,
            role,
            region,
            password : hashedPassword
        })
        //saving new user
        const savedUser = await newUser.save()
        const payload = {
            userId : savedUser._id
        }
        // const secretKey = process.env.SECRET_KEY;
        const secretKey = "underdog"
        const options = {
            expiresIn : '3h'
        }
        const token = jwt.sign(payload, secretKey, options)
        // const userRole = savedUser.role
        // res.status(201).json({
        //     token,
        //     savedUser})
        res.cookie('token', token).json({savedUser})
    }catch (error) {
        res.status(500).json( {message : 'Internal Server Error'} )
        console.log(error)
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message :'User not found'})
        }
        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            res.status(400).json({message :'Invalid Credentials!'})
        }

        const payload = {
            userId : user._id
        }
        // const secretKey = process.env.SECRET_KEY
        const secretKey = "underdog"
        const options = {
            expiresIn : '3h'
        }

        const token = jwt.sign(payload, secretKey, options)
        // const userRole = user.role
        // res.status(200).json({
        //     token,
        //     user
        // })
        res.cookie('token', token).json({user})
    }catch (err){
        console.log(err)
        res.status(500).json({message : 'Internal Server Error'})
    }
}
const logout = async (req, res) => {
    try {
      // Clear the JWT token from the client-side
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    signup,
    login,
    logout
}