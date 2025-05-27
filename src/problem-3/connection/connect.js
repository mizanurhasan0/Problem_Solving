
import mongoose from 'mongoose';

/* * Connect to MongoDB using Mongoose
 * @returns {Promise<mongoose.Connection>} The connection object
 */
export default async function connectToDatabase() {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (!conn) return console.error("Failed to connect to the database");

        console.log("Connected to the database successfully");
        return conn;

    } catch (e) {
        console.error({ e });
    }
}