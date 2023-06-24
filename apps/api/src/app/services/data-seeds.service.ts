import { Injectable } from "@nestjs/common";

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Antique } from "../schemas/antique.schema";
import { Auction } from "../schemas/auction.schema";

import { AntiqueGenerator } from "./antique.generator";
import { AuctionGenerator } from "./auction.generator";

@Injectable()
export class DataSeedsService {
    constructor(
        // @InjectModel('User', 'SNT_DB') private userModel: Model<User>,
        @InjectModel('Antique', 'SNT_DB') private antiqueModel: Model<Antique>,
        @InjectModel('Auction', 'SNT_DB') private auctionModel: Model<Auction>

    ) {
        setTimeout(() => {
            this.seed()
            .catch(err => console.log('DataSeedsService failed to seed', err))
        }, 5000);
    }

    async seed(): Promise<boolean> {
        if ((await this.antiqueModel?.countDocuments({})) === 0) {
            await this.antiqueModel.collection.drop()
            const antiquesList = AntiqueGenerator.generate()
            await this.antiqueModel.insertMany(antiquesList as any[])
            console.log('Antiques seeded')
        }
        
        if ((await this.auctionModel?.countDocuments({})) === 0) {
            let antiques = await this.antiqueModel.find({}, {_id:1, name:1}).lean()
            await this.auctionModel.collection.drop()
            const auctionsList = AuctionGenerator.generate(antiques as any)
            await this.auctionModel.insertMany(auctionsList as any[])
            console.log('Auctions seeded')
        }

        return true;
    }
}


