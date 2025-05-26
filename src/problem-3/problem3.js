import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './connection/connect.js';
import generateRandomTransaction from './generate_data/generate_transaction.js';
import { eventBus } from './utils/eventBus.js';
import validateTransaction from './validate/validate_transaction.js';

const app = express();
connectToDatabase().catch(err => { console.error("Database connection failed:", err); });

setInterval(async () => {
    await generateRandomTransaction();
}, 5000);

// Event listener for new transactions
// eventBus.on('transaction:new', async (trx) => {
//     await validateTransaction(trx);
//     // console.log("New transaction event received:", trx);
// });

validateTransaction();
// Server setup
const server = http.createServer(app);
server.listen(5000, () => {
    console.log("Server listening on port 5000...");
});
