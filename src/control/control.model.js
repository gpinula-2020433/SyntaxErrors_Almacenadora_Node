import { Schema, model } from "mongoose";

const controlSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['ENTRANCE', 'EXIT'],
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
        },
        product:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Control', controlSchema)