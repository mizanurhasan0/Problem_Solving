import { Transaction } from "../model/transaction.js";

// export const fetchPendingTransactions = async () => {
//     try {
//         return await Transaction.find({ checked: false, valid: false }).sort({ timestamp: 1 }) || [];
//     } catch (error) {
//         throw new Error("Error in updateTransaction: " + error.message);
//     }
// }

/**
 * Updates the status of a transaction by its ID.
 * @param {string} id - The ID of the transaction to update.
 * @param {Object} data - The data to update the transaction with.
 * @returns {Promise<Object>} The updated transaction or an empty object if not found.
 */
export const updateTransactionStatus = async (id, data) => {
    try {
        const { valid } = data;
        return await Transaction.findOneAndUpdate(
            { _id: id },
            { checked: true, valid: valid },
            { new: true }
        ) || {};

    } catch (error) {
        throw new Error("Error in updateTransaction: " + error.message);
    }
}

/**
 * Retrieves the next FIFO transaction that has not been checked.
 * @returns {Promise<Object>} The next FIFO transaction or null if none found.
 */
export const getNextFifoTransaction = async () => {
    try {
        return await Transaction.findOne({ checked: false }).sort({ timestamp: 1 });
    } catch (error) {
        throw new Error("Error in get_FIFO_Data: " + error.message);
    }
}