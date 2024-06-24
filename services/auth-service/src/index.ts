import { connectDB } from './config';
import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error starting server:', err.message);
        } else {
            console.error('Unexpected error', err);
        }
    }
};

startServer();
