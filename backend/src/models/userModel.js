const mongoose = require('mongoose')
const { isEmail, isLowercase } = require('validator')

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['buyer', 'seller'],
        required : true
    },
    email : {
        type : String,
        required : true,
        isLowercase : true,
        validate : {
            validator : (value) => isEmail(value),
            message : '{VALUE} is not a valid email address'
        }
        },
    password : {
        type : String,
        required : true
    },
    region : {
        type : String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
})

const User = mongoose.model('User', userSchema)

module.exports = User;