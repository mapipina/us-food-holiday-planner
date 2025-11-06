import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
dotenv.config();

import { connectDB } from './db/connection'; 
// import holidayRoutes from './routes/holidayRoutes'; 
// import recipeRoutes from './routes/recipeRoutes';

const app: Application = express();

connectDB(); 

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
})); 
app.use(express.json());


// app.use('/api/v1/holidays', holidayRoutes);
// app.use('/api/v1/recipes', recipeRoutes); // will need to use external API

export default app;
