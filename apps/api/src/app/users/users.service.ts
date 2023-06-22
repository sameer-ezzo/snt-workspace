import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {


    constructor(@InjectModel('User', 'SNT_DB') private userModel: Model<User>) { }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne<User>({ email })
    }

    async create(payload: { password } & Partial<User>): Promise<any> {

        const { password } = payload
        const email = payload.email?.trim().toLocaleLowerCase()
        if (await this.findByEmail(email)) throw new Error('User already exists')


        if (!email || !password) throw new Error('Invalid payload')
        const user = { ...payload } as Partial<User>
        if (!user.username) user.username = email

        const res = await this.userModel.insertMany([user])
        return res[0]
    }
}
