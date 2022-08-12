import { Schema, InferSchemaType } from 'mongoose';
var passportLocalMongoose = require('passport-local-mongoose');
const loginInfo = new Schema({
    status: { type: String, required: true },
    date: Date
})

export const UserSchema = new Schema({
    // _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    securityKey: { type: String, required: true },
    loginAttempts: [loginInfo],
    lastLogin: loginInfo,
    locked: { status: Boolean, date: Date },
    favorites: Boolean,
    avatar: String
});
UserSchema.plugin(passportLocalMongoose)

export type User = InferSchemaType<typeof UserSchema>
export type UserDocument = User & Document



// userSchema.virtual('password').set(async function (password) {
//     this.securityKey = Math.random().toString(36).substring(7);
//     const salt = await bcrypt.genSalt();
//     this.passwordHash = await bcrypt.hash(password, salt)
// })