import express, { Application } from 'express';
import mongoose from 'mongoose';
import adminRoutes from '../src/routes/adminRoutes';
import dotenv from 'dotenv';
// import { consumer } from './config/kafka-consumer';
import productCategoryRoutes from './routes/productCategoryRoutes';
import discountRoutes from './routes/discountRoutes';
import { startUserInfoResponseConsumer } from './services/userGetInfoServices';

dotenv.config();

const app: Application = express();
const PORT: number = 3004;

// Middleware
app.use(express.json());

// startUserInfoResponseConsumer();

// MongoDB Connection
const mongoURI: string = 'mongodb+srv://microservice-database:microservice-database@microservice-database.wsomfbj.mongodb.net/?retryWrites=true&w=majority&appName=microservice-database';

mongoose.connect(mongoURI).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// consumer.on('error', (error) => {
//   console.error('Kafka consumer error:', error);
// });

app.use('/api/v1', adminRoutes);
app.use('/api/v1', productCategoryRoutes);
app.use('/api/v1', discountRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








