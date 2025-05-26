import { getNextFifoTransaction, updateTransactionStatus } from "../service/transaction.service.js";

const attemptDelays = [2, 5, 10, 20, 30];

export default async function validateTransaction() {
    let attemptCount = 0;

    async function attemptValidation() {
        if (attemptCount >= attemptDelays.length) {
            console.log("Max attempts reached");
            attemptCount = 0; // Reset attempt count
        }

        const transaction = await getNextFifoTransaction();
        if (!transaction?.trxId) {
            const delay = process.env.INTERVAL || 5000
            return setTimeout(attemptValidation, delay);
        }
        const randomTrxId = Math.floor(Math.random() * 1000);
        const isValid = Number(transaction.trxId) === randomTrxId;

        await updateTransactionStatus(transaction._id, { valid: isValid });
        console.log(`Transaction ID: ${transaction.trxId}, Random ID: ${randomTrxId}, Valid: ${isValid}`);

        if (!isValid) setTimeout(attemptValidation, attemptDelays[++attemptCount] * 1000);

    }
    await attemptValidation();

}   