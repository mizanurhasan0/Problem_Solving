import { Transaction } from "../model/transaction.js";

// export const fetchPendingTransactions = async () => {
//     try {
//         return await Transaction.find({ checked: false, valid: false }).sort({ timestamp: 1 }) || [];
//     } catch (error) {
//         throw new Error("Error in updateTransaction: " + error.message);
//     }
// }

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

export const getNextFifoTransaction = async () => {
    try {
        return await Transaction.findOne({ checked: false, valid: false }).sort({ timestamp: 1 });
    } catch (error) {
        throw new Error("Error in get_FIFO_Data: " + error.message);
    }
}