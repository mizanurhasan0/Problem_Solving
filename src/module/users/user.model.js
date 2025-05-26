import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: { type: String, required: true, enum: ['local', 'google'] },
    googleId: { type: String }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);