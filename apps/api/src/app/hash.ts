import * as bcrypt from 'bcrypt';

// UserSchema.plugin(passportLocalMongoose)
export function hash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
