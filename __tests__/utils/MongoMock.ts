import mongoose, { Mongoose } from 'mongoose';

class MongoMock {
    private database!: Mongoose;

    async connect(): Promise<void> {
        const url = process.env.MONGO_URL
        if (!url) throw new Error("MongoDB server not initialized!");

        this.database = await mongoose.connect(url);
    }

    async disconnect(): Promise<void> {
        return this.database.connection.close();
    }
}

export default new MongoMock();
