const express = require('express')
const connectDB = require('./config/db')

const app = express()

//middlewares
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//listening for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Listening for requests on', PORT)
})
