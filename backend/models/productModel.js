const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = ({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    images : [{
        type : String,
        required : true
    }],
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product