import { model, Schema, Document } from 'mongoose'

export interface IProduct extends Document {
    name: string
    loc: Number
    productor: string
}

const prodSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true,
        lowercase: false,
        trim: true
    },
    productor: {
        type: String,
        unique: false,
        required: true,
        lowercase: false,
        trim: true
    },
    loc: {
        type: Number,
        required: true
    }
})

export default model<IProduct>('Product', prodSchema, 'productos')