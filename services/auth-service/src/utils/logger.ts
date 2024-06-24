import axios from 'axios';

const log = async (message: string, level: string) => {
    try {
        await axios.post(`${process.env.LOGGING_SERVICE_URL}/logs`, {
            message,
            level,
        });
    } catch (err) {
        console.error('Error logging message', err);
    }
};

export { log };
