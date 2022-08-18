import  { Schema, InferSchemaType } from 'mongoose';

export const AuctionSchema = new Schema({

    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    location: String,

    startingPrice: Number,
    currency: { type: String, required: true, default: 'USD' },
    image: { type: String },
    category: { type: String, index: true, default: null },
    tags: { type: [String], index: true, default: null },
    images: [String],
    openDate: { type: Date, required: true, default: new Date() },
    closeDate: { type: Date, required: true, default: new Date() },
}, { strict: true });


AuctionSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/\s/g, '-')
    next();
});

export type Auction = { _id: string } & InferSchemaType<typeof AuctionSchema>;