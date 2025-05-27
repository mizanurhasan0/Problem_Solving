import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './connection/connect.js';
import generateRandomTransaction from './generate_data/generate_transaction.js';
import validateTransaction from './validate/validate_transaction.js';

const app = express();
connectToDatabase().catch(err => { console.error("Database connection failed:", err); });

const intervalId = setInterval(async () => {
    await generateRandomTransaction();
}, process.env.INTERVAL || 5000);

// Event listener for new transactions
// eventBus.on('transaction:new', async (trx) => {
//     await validateTransaction(trx);
//     // console.log("New transaction event received:", trx);
// });

validateTransaction();
// Server setup
const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
    process.on('SIGINT', () => {
        console.log('Shutting down...');
        clearInterval(intervalId);
        process.exit();
    });
    console.log("Server listening on port :", process.env.PORT || 5000);
});
