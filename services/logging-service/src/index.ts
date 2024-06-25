import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Log from './models/log';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://logging-mongo:27017/logging';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

app.post('/logs', async (req, res) => {
    const { message, level } = req.body;
    try {
        const log = new Log({ message, level });
        await log.save();
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: 'Failed to log message' });
    }
});

app.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Logging service running on port ${PORT}`);
});
