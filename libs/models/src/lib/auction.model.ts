import { AntiqueModel } from "./antique.model";
import { BaseModel } from "./base.model";


export class AuctionModel extends BaseModel {
    antique!: AntiqueModel
    status: 'open' | 'closed' | 'sold' = 'open'
    address!: string
    startingPrice!: string
    currency!: string
    openDate!: Date
    closeDate!: Date
    contactInfo!: { phone: string, email: string, name: string }
    map?: string = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34042.39268681353!2d28.935154894528782!3d41.04820413371837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab79d7f133593%3A0xb9182e0040343f01!2sMandarin%20Oriental%20Bosphorus%2C%20Istanbul!5e0!3m2!1sen!2str!4v1687597112202!5m2!1sen!2str'
}
