import { Transaction } from "../model/transaction.js";

export const getTransaction = async () => {
    try {
        return await Transaction.find({ checked: false, valid: false }).sort({ timestamp: 1 }) || [];
    } catch (error) {
        console.error("Error in getTransaction:", error);
    }
}

export const updateTransaction = async (id, data) => {
    try {
        const { valid } = data;
        return await Transaction.findOneAndUpdate(
            { _id: id },
            { checked: true, valid: valid },
            { new: true }
        ) || {};

    } catch (error) {
        console.error("Error in updateTransaction:", error);
    }
}

export const get_FIFO_Data = async () => {
    try {
        return await Transaction.findOne({ checked: false, valid: false }).sort({ timestamp: 1 });

    } catch (error) {
        console.error("Error in updateTransaction:", error);
    }
}