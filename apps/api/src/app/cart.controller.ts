import { Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express'
import { Model } from 'mongoose';
import { Antique } from './schemas/antique.schema';
import { CartItem, User } from './users/user.schema';

@Controller('cart')
export class CartController {


    constructor(@InjectModel('User', 'SNT_DB') private userModel: Model<User>,
        @InjectModel('Antique', 'SNT_DB') private antiqueModel: Model<Antique>) {
    }

    @Get(':userId')
    async cart(@Param('userId') userId: string) {
        if (userId.trim().length === 0) throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST)
        const user = await this.userModel.findById(userId)
        if (!user) throw new HttpException('Invalid user', HttpStatus.NOT_FOUND)
        const cart = user.get('cart') ?? []
        const cids = cart.map(c => c.itemId)
        if (cart.length === 0) return { total: cart.length, data: cart }
        const ais = await this.antiqueModel.find({
            _id: { $in: cids },
            status: 'available'
        }, { _id: 1 }, { lean: true })

        const availableItems = cart.map(x => x._doc).filter(x => ais.findIndex(ai => x.itemId === `${ai._id}`) > -1)

        user.set('cart', availableItems)
        await user.save()
        return { total: availableItems.length, data: availableItems }
    }

    @Post('add')
    async add(@Req() req: Request) {
        const { userId, itemId, url } = req.body
        if (!userId || !itemId) throw new HttpException('Invalid userId or itemId', HttpStatus.BAD_REQUEST)
        const user = await this.userModel.findById(userId)
        if (!user) throw new HttpException('Invalid user', HttpStatus.NOT_FOUND)

        const cart = user.get('cart') ?? []

        if (cart.find(c => c.itemId === itemId)) throw new HttpException('Item already in cart', HttpStatus.BAD_REQUEST)


        const item = await this.antiqueModel.findById(itemId)
        if (!item || item.status !== 'available') throw new HttpException('Invalid item', HttpStatus.BAD_REQUEST)

        const cartItem = {
            currency: item.currency,
            date: new Date(),
            image: item.image,
            name: item.name,
            price: item.price,
            quantity: 1,
            user: userId,
            url,
            itemId
        } as CartItem
        cart.push(cartItem)
        user.set('cart', cart)
        await user.save()
        return user.cart
    }

    @Post('remove')
    async remove(@Req() req: Request) {
        const { userId, itemId } = req.body
        if (!userId || !itemId) throw new HttpException('Invalid userId or itemId', HttpStatus.BAD_REQUEST)
        const user = await this.userModel.findById(userId)
        if (!user) throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST)

        const cart = (user.get('cart') ?? []).map(x => x._doc)
        const idx = cart.findIndex(c => c.itemId === itemId)
        if (idx < 0) throw new HttpException('Item is not in cart', HttpStatus.BAD_REQUEST)

        cart.splice(idx, 1)

        user.set('cart', cart)
        await user.save()
        return user.cart
    }

}