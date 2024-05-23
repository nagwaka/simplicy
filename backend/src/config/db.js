const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.DBURI)
        .then((result) => {
            console.log('Connected to DB successfully')
        })
        .catch((err) => {
            console.log('Could not connect to DB: ', err)
	    process.exit(1)
        })
}

module.exports = connectDB
