const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Listening for requests on', PORT)
})
