const mongoose = require('mongoose')
const { isEmail, isLowercase } = require('validator')
const Schema = mongoose.Schema

const userSchema = ({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : [true, 'Please enter an email address'],
        isLowercase : true,
        validate : {
            validator : (value) => isEmail(value),
            message : 'Please Enter a valid E-mail address'
        }
    },
    role : {
        type : String,
        default : ['buyer', 'seller']
    },
    region : {
        type : String,
        required : true,
        default : ['Africa']
    },
    password : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('User'. userSchema)
module.exports = User