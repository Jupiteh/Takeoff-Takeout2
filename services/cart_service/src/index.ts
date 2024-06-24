import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cartRoutes from './routes/cartRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3002', // Remplacez par l'origine de votre application front-end
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Configurer Express pour servir les fichiers statiques
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((err: any) => {
  console.error('Error connecting to MongoDB:', err);
});

// Définir les routes de l'API
app.use('/api', cartRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
