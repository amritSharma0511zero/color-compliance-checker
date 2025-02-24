
import express from 'express' 
import dotenv from 'dotenv'
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import reportRoute from './routes/reportRoute.js'
import cookieParser from 'cookie-parser';
import colorRoute from './routes/colorRoute.js'
import cors from 'cors'
dotenv.config({});

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/v1/user", userRoute );
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/color", colorRoute);


const PORT = process.env.PORT||8080;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})