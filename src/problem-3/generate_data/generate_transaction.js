import { Transaction } from "../model/transaction.js";
import { eventBus } from "../utils/eventBus.js";

/**
 * Generates a random transaction with a random trxId and amount,
 * creates it in the database, and emits an event for the new transaction.
 * @returns {Promise<Object|null>} The created transaction or null if creation failed.
 */
export default async function generateRandomTransaction() {
    const trxId = Math.floor(Math.random() * 1000);
    const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
    const data = {
        trxId,
        amount,
        timestamp: new Date().toISOString(),

    }
    const trx = await Transaction.create(data);
    console.log("New transaction created");
    // Emit an event for the new transaction
    if (trx) return eventBus.emit('transaction:new', trx);
    return null;
}
