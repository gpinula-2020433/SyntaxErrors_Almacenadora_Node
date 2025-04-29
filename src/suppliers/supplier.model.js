import { Schema, model } from "mongoose";

const supplierSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Supplier', supplierSchema);

