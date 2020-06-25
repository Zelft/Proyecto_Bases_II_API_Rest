import { model, Schema, Document } from 'mongoose'

export interface Const extends Document {
    id: Number
    name: string
    latitude: Number
    longitude: Number
}

const constSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        lowercase: false,
        trim: true
    },
    name: {
        type: String,
        unique: false,
        required: true,
        lowercase: false,
        trim: true
    },
    latitude: {
        type: Number,
        unique: false,
        required: true,
        lowercase: false,
        trim: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

export default model<Const>('Constants', constSchema, 'constants')