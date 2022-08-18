import  { Schema, InferSchemaType } from 'mongoose';

export const AntiqueSchema = new Schema({

    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, index: true },
    tags: { type: [String], index: true, default: null },
    images: { type: [String], required: true, default: null },
    status: { type: String, enum: ['available', 'sold'], index: true, required: true, default: 'available' }
}, { strict: true });

AntiqueSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/\s/g, '-')
    next();
});

export type Antique = { _id: string } & InferSchemaType<typeof AntiqueSchema>;