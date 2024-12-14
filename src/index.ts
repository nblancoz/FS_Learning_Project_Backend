import express from 'express';
import { dbConnection } from '../config/config';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

dbConnection();

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
