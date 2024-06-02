const mongoose = require('mongoose')
const config = require('./config')

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/simplicy")
    .then((result) => {
        console.log('Connected to DB successfully')
        // console.log(result)
    })
    .catch(err => {
        console.error('Could not connect to db : ',err)
        process.exit(1)
    })
}
module.exports = connectDB