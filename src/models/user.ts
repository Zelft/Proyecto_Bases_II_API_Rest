import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string
    password: string
    comparePassword: (password: string ) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10) // Método asíncrono que devuelve un salt
    // Salt es un string que usamos para cifrar la contraseña

    const hash = await bcrypt.hash(this.password, salt)
    // en hash se cifra la contraseña y se guarda como contrasenna
    this.password = hash
    next()
})

userSchema.methods.comparePassword = async function (password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema, 'users')