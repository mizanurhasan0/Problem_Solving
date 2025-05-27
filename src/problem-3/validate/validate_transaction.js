import { getNextFifoTransaction, updateTransactionStatus } from "../service/transaction.service.js";

// timeout delays in seconds for each attempt
const attemptDelays = [120, 300, 600, 1200, 1800, 3600];

/**
 * Validates transactions by checking if the trxId matches a randomly generated number.
 * @returns {Promise<void>}
 */
export default async function validateTransaction() {
    let attemptCount = 0;
    /**
     * Attempts to validate the next FIFO transaction.  
     * If no transaction is found, it waits for the next interval.
     * If the transaction is valid or the maximum number of attempts is reached, it updates the transaction status.
     * If the transaction is invalid, it waits for a specified delay before trying again.
     * @param {number} attemptCount - The current attempt count for validation.
     * @return {Promise<void>}
     **/
    async function tryValidate() {
        // Fetch the next FIFO transaction
        const transaction = await getNextFifoTransaction();

        // If no transaction is found, wait for the next interval
        if (!transaction?.trxId) {
            const delay = process.env.INTERVAL || 5000
            return setTimeout(tryValidate, delay);
        }
        const randomTrxId = Math.floor(Math.random() * 1000);
        const isValid = Number(transaction.trxId) === randomTrxId;

        // Log the transaction being validated and update the status when meeting the conditions
        if (attemptCount === (attemptDelays.length - 1) || isValid) {
            await updateTransactionStatus(transaction._id, { valid: isValid });

            // if(isValid) than this will be called netfeeCustomerRecharge() 

            attemptCount = 0; // Reset attempt count after updating status
            tryValidate();
        }

        console.log(`Transaction ${transaction._id} validation result: ${isValid ? 'Valid' : 'Invalid'}`);
        // Increment the attempt countand delay the next validation attempt if the transaction is invalid
        if (!isValid) setTimeout(tryValidate, attemptDelays[++attemptCount] * 1000);

    }
    // Start the validation process
    await tryValidate();
}   