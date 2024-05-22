const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const setupSwagger = require('./config/swagger');


// loading env variables
dotenv.config()

//starting app
const app = express()

connectDB()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/products/', productRoutes)

// Set up Swagger
setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on Port', PORT)
})
