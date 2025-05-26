import { get_FIFO_Data, updateTransaction } from "../service/transaction.service.js";



export default async function validateTransaction() {
    const attemptDelays = [2, 5, 10, 20, 30, 60];
    let attemptCount = 0;

    async function attemptValidation() {
        if (attemptCount >= attemptDelays.length) {
            console.log("Max attempts reached, transaction will not be validated.");
            attemptCount = 0;
            // return;
        }

        let randomTrxId = Math.floor(Math.random() * 1000);
        const transaction = await get_FIFO_Data();
        console.log("txId:", Number(transaction.trxId), "Random trxId:", randomTrxId);
        if (Number(transaction.trxId) === randomTrxId) {
            const uptTrx = await updateTransaction(transaction._id, { valid: true });
            console.log("Transaction is valid:");

        } else {
            const uptTrx = await updateTransaction(transaction._id, { valid: false });
            console.log("Transaction is invalid:");
            attemptCount++;
            setTimeout(attemptValidation, attemptDelays[attemptCount] * 1000);
        }
    }
    await attemptValidation();

}   