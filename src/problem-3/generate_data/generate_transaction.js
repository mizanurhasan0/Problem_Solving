import { Transaction } from "../model/transaction.js";
import { eventBus } from "../utils/eventBus.js";

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
    if (trx) return eventBus.emit('transaction:new', trx);
    return null;
}
