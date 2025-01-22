import express from 'express'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import { config } from 'dotenv'; // Import dotenv's config method
// import { MongoClient, ServerApiVersion } from 'mongodb';

config();

const uri = process.env.DB_URI;

const app = express()
app.use(express.json())

mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error('MongoDB connection error:', err));



app.use('/auth', authRoutes)

const PORT = 3000


app.listen(PORT, () => console.log(`server running on port: ${PORT}....`))


