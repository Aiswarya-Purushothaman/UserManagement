import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import {connectDB} from './db/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import path from'path'

const app=express();

dotenv.config();
connectDB()

const port = process.env.PORT||5000;   

app.use('/public', express.static('backend/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser());

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

if(process.env.NODE_ENV==='production'){
  const __dirname=path.resolve()
  app.use(express.static(path.join(__dirname,'frontend/dist')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'dist','index.html')))
}else{

  app.get('/',(req,res)=>res.send('Server is ready'))

}



app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port ${port} `))