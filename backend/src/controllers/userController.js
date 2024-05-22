//get all users. get user by ID, update user and delete user
const User = require('../models/userModel')
//get all users
const getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (err){
        res.status(500).json({message : 'Internal Server Error'})
        console.log(err)
    }
}
//get a specific User
const getById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            res.json(400).json({message :'User Not Found'})
        }
        res.status(200).json(user) 
    }
    catch(err){
        res.status(500).json({message : 'Internal Server Error'})
        console.log(err)
    }
}
//updating user
const updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new : true})
        if(!updatedUser){
            res.status(404).json({message : 'User Not Found'})
        }
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json({message : 'Internal Server Error'})
        console.log(err)
    }
}
//deleting User
const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            res.status(400).json({message : 'User Not Found'})
        }
        res.status(200).json('User Deleted Successfully')
    } 
    catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err)
    }
}

module.exports = {
    getAll,
    getById,
    updateUser,
    deleteUser
}
