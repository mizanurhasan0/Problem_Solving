import mongoose, { Schema } from "mongoose";

// Define the schema for a transaction
const transactionSchema = new Schema({
    trxId: { type: String, required: true },
    amount: { type: Number, required: true },
    valid: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);

