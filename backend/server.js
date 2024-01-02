import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
const port = process.env.PORT || 5000;

connectDB(); //to connect to DB

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cookie Parser Middleware (allows us to access req.cookies.jst )
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send('API is running...')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req,res)=>res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

const __dirname= path.resolve(); //set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log(`Server's up and running on ${port}`));

