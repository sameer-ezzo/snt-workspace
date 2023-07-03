import { AntiqueModel } from "./antique.model";
import { BaseModel } from "./base.model";


export type AuctionAntique = { aid: string, name: string }
export class AuctionModel extends BaseModel {
    antique: AuctionAntique = { aid: '', name: '' }
    status: 'open' | 'closed' | 'sold' = 'open'
    address: string = ''
    startingPrice: string = ''
    currency: string = ''
    openDate: Date = new Date()
    closeDate: Date = new Date()
    contactInfo: { phone: string, email: string, name: string } = { phone: '', email: '', name: '' }
    map?: string = ''
}


export type AuctionViewModel = AuctionModel & { antique: AntiqueModel }