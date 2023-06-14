import express from "express";
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import cors from 'cors'
import connectDB from "./config/dbConnect.js";
import colors from "colors"
import userRoutes from './routes/userR.js'
import errorHandler from './middleware/errorHandler.js'
import chatRoutes from './routes/chatR.js'


const PORT = process.env.PORT || 5000
connectDB()


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)



app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.yellow.bold)
})