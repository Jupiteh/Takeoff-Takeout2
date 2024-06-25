import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importer le middleware CORS
import routes from './routes/index';

const app = express();

// Configurer CORS pour autoriser les requêtes provenant de http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Autoriser uniquement votre frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());
app.use('/auth', routes);

export default app;
