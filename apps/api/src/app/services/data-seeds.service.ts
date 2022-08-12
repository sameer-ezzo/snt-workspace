import { Injectable } from "@nestjs/common";

import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AntiqueGenerator } from "./antique.generator";
import { AuctionGenerator } from "./auction.generator";

@Injectable()
export class DataSeedsService {
    constructor(@InjectConnection('SNT_DB') private connection: Connection) {
        this.seed()
            .then(() => console.log('DataSeedsService seeded'))
            .catch(err => console.log('DataSeedsService failed to seed', err))
    }

    async seed(): Promise<any> {
        const collections = await this.connection.db.collections()
        const antiques = collections.find(c => c.collectionName === 'antiques')
        if ((await antiques.estimatedDocumentCount()) === 0) {
            await antiques.drop()
            const antiquesList = AntiqueGenerator.generate()
            await antiques.insertMany(antiquesList)
        }

        const auctions = collections.find(c => c.collectionName === 'auctions')
        if ((await auctions.estimatedDocumentCount()) === 0) {
            await auctions.drop()
            const auctionsList = AuctionGenerator.generate()
            await auctions.insertMany(auctionsList)
        }

        return true;
    }
}


