import { AuctionModel } from 'libs/models/src';
import { names } from './statics';

export class AuctionGenerator {
  static generate(): AuctionModel[] {
    return new Array(1000).fill({}).map((item, index) => AuctionGenerator.generateOne(index + 1));
  }
  static generateOne(id: number): any {
    const index = id - 1;
    const name = names[index % names.length];
    return {
      id,
      name,
      slug: name.toLowerCase().replace(/\s/g, '-') + id,
      description: `Event ${id} description`,
      price: Math.floor(Math.random() * 100),
      image: `https://picsum.photos/id/${id}/200/300`
    };
  }
}
