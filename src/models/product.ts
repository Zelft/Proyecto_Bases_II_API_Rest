import { model, Schema, Document } from 'mongoose'

export interface IProduct extends Document {
    name: string
    loc: string
    // comparePassword: (password: string ) => Promise<boolean>
}

const prodSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true,
        lowercase: true,
        trim: true
    },
    loc: {
        type: String,
        required: true
    }
})

export default model<IProduct>('Product', prodSchema, 'productos')