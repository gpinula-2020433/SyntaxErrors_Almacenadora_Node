import { Schema, model } from "mongoose";

const controlSchema = new Schema(
    {
        product: {
            type: String,
            required: [true, 'Product name is required']
        },
        type: {
            type: String,
            enum: ['entrance', 'exit'],
            required: [true, 'Type is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        employee: {
            type: String,
            required: [true, 'Employee is required']
        },
        reason: {
            type: String,
            required: [false, 'Reason is not mandatoryd']
        },
        destination: {
            type: String,
            required: [false, 'Destination is not mandatoryd']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Control', controlSchema)