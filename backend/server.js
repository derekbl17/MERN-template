const express = require('express')
const colors=require('colors')
const dotenv=require('dotenv').config() // any changes to .env require server restart
const cookieParser=require('cookie-parser')
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./config/db')
const port = process.env.PORT || 5001

connectDB()

const app = express()

app.use(express.json()) // enables reading of data in request body if its in .json format
app.use(cookieParser())

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/categories',require('./routes/categoryRoutes'))

app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`server started on port ${port}`))