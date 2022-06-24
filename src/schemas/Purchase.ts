import mongoose, { Document, Schema } from 'mongoose';

interface Purchase extends Document {
    email: string;
    tags: string[];
};

const PurchaseSchema = new Schema(
    {
        orderNumber: {
            type: Number,
            unique: true
        },
        clientName: {
            type: String,
            required: true
        },
        productName: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        unitValue: {
            type: Number,
        },
        totalValue: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model<Purchase>('Purchase', PurchaseSchema);