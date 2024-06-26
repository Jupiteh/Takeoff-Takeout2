import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import deliveryRoutes from './routes/deliveryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Configurer Express pour servir les fichiers statiques
app.use(express.json());
// app.use('/uploads/restaurant', express.static(path.join(__dirname, '../uploads/restaurant')));
// app.use('/uploads/article', express.static(path.join(__dirname, '../uploads/article')));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((err: any) => {
  console.error('Error connecting to MongoDB:', err);
});

// Définir les routes de l'API
app.use('/api', deliveryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
