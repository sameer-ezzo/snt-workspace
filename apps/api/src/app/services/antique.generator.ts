import { AntiqueModel } from 'libs/models/src';
import { dates, itemImages, names, photos, prices } from './statics';

export class AntiqueGenerator {
  static generate(): AntiqueModel[] {
    return new Array(1000).fill({}).map((item, index) => AntiqueGenerator.generateOne(index + 1));
  }
  static generateOne(id: number): any {

    const index = id - 1;
    const name = names[index % names.length].trim();
    const shortDesc = dates[index % dates.length].trim();

    return {
      id,
      name: name,
      slug: name.toLowerCase().replace(/\s/g, '-') + id,
      shortDesc,
      description: id % 2 === 0 ? 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...' : 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
      price: prices[index % prices.length],
      image: photos[index % photos.length],
      category: 'Antiques',
      tags: ['Victorian', 'Century', 'Antique'],
      images: itemImages
    };
  }
}
