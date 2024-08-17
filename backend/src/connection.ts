import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) {
        throw new Error("MONGODB_URL is not defined");
    }

    try {
        await connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        throw new Error("Could not connect to MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Could not disconnect from MongoDB", error);
        throw new Error("Could not disconnect from MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };
