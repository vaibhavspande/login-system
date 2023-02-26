import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";


const router = express.Router();

  
const app = express();
dotenv.config();


//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());    

app.use(userRoutes)









mongoose.set('strictQuery', true)
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connnected 🔥`);
    } catch (error) {
       console.log(error);
    }

}


const port = process.env.PORT || 5000;

//server connected
app.listen(port, () => {
    connect();
    console.log(`Server running on port ${port} 🔥`);
});