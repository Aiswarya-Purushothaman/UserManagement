// import mongoose from 'mongoose'

// const connectDB=async ()=>{
//   try {
  
//     await mongoose.connect("mongodb://127.0.0.1:27017/user-management",{
//     })
//     console.log("connected to DB");
//   } catch (error) {
//     console.log(error,"connection failed");
//   }
// }



// export default connectDB;

import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {          

    try {
        
        const connectMongoDB = await mongoose.connect(process.env.MONGO_Url);

        console.log(`Mongo DB connected successfully: ${connectMongoDB.connection.host}`);

    } catch (error) {
        
        console.error(`Error connecting to Mongo DB: ${error.message}`);

        process.exit(1);
       
    }

};


export {connectDB }