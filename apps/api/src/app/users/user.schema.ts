import { Schema, InferSchemaType, ObjectId } from 'mongoose'
import { hash } from '../hash'

export const CartItemScheme = new Schema({
    itemId: String,
    name: String,
    price: Number,
    currency: String,
    quantity: Number,
    image: String,
    url: String,
    date: Date,
    user: String,
    status: String
}, { _id: false })

const LoginInfo = new Schema({
    status: { type: String, required: true },
    date: Date
}, { _id: false })



export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    securityKey: { type: String, required: true },
    lastLogin: LoginInfo,
    locked: { status: Boolean, date: Date },
    createdAt: { type: Date, default: new Date() },
    cart: { type: [CartItemScheme], default: [] }
}, { strict: true })

UserSchema.virtual('password').set(async function (password) {
    this.securityKey = Math.random().toString(36).substring(7)
    this.passwordHash = hash(password)
})

export type CartItem = InferSchemaType<typeof CartItemScheme>
export type User = { _id: string } & InferSchemaType<typeof UserSchema>