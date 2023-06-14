import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`MongoDb Connected --- ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error -- ${error.message}`.red.bold)
        process.exit()
    }
}

export default connectDB