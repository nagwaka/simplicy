const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.DBURI)
        .then((result) => {
            console.log('Connected to DB')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectDB