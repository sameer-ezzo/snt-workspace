
import { Antique } from '../schemas/antique.schema';
import { dates, itemImages, names, photos, prices } from './statics';

export class AntiqueGenerator {
  static generate(): Partial<Antique>[] {
    return new Array(25000).fill({}).map((item, index) => AntiqueGenerator.generateOne(index + 1));
  }
  static generateOne(id: number): Partial<Antique> {

    const index = id - 1;
    const name = names[index % names.length].trim();
    const shortDescription = dates[index % dates.length].trim();

    const currency = prices[index % prices.length].substring(0,1).trim()
    const p = prices[index % prices.length].substring(1).replace(',', '').trim()
    const price = parseInt(p)

    return {
      name: name + id,
      slug: name.toLowerCase().replace(/\s/g, '-') + id,
      shortDescription,
      description: id % 2 === 0 ? 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...' : 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
      price,
      currency,
      image: photos[index % photos.length],
      category: 'Antiques',
      tags: ['Victorian', 'Century', 'Antique'],
      images: itemImages
    };
  }
}
