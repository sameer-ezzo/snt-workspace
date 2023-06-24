import { Schema, InferSchemaType } from 'mongoose';



export const AuctionSchema = new Schema({
    _id:String,
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    antique: new Schema({
        aid: String,
        name: String
    }, { _id: false }),
    status: { type: String, enum: ['open', 'closed', 'sold'], index: true, required: true, default: 'open' },

    openDate: { type: Date, required: true, default: new Date() },
    closeDate: { type: Date, required: true, default: new Date() },
    contactInfo: { phone: String, email: String, name: String },
    address: String,
    map: String,
    startingPrice: Number,
    currency: { type: String, required: true, default: 'USD' },
    category: { type: String, index: true, default: null },
    tags: { type: [String], index: true, default: null },
}, { strict: true });


AuctionSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/\s/g, '-')
    next();
});

export type Auction = { _id: string } & InferSchemaType<typeof AuctionSchema>;