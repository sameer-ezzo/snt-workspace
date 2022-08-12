import { Schema, InferSchemaType } from 'mongoose';

export const AntiqueSchema = new Schema({
    // _id: { type: String, required: true },
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: Array, required: true },
    images: { type: Array, required: true }
});

AntiqueSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/\s/g, '-')
    next();
});

export type Antique = InferSchemaType<typeof AntiqueSchema>;
export type AntiqueDocument = Antique & Document
