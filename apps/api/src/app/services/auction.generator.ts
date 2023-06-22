
import { Auction } from '../schemas/auction.schema';
import { dates, names, prices } from './statics';


function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

const getRandomDateRange = () => {
  const now = new Date()
  const date = new Date(now.getFullYear(), random(0, 11), random(1, 28))
  const future = random(5, 45) * 24 * 60 * 60 * 1000 //milliseconds
  return { from: date, to: new Date(date.getTime() + future) }
}
export class AuctionGenerator {
  static generate(): Partial<Auction>[] {
    return new Array(25000).fill({}).map((item, index) => AuctionGenerator.generateOne(index + 1));
  }
  static generateOne(id: number): Partial<Auction> {
    const index = id - 1;
    const name = names[index % names.length].trim();
    const shortDescription = dates[index % dates.length].trim();
    const currency = prices[index % prices.length].substring(0, 1).trim()
    const p = prices[index % prices.length].substring(1).replace(',', '').trim()
    const price = parseInt(p)
    const dr = getRandomDateRange()
    return {
      name: name + id,
      slug: name.toLowerCase().replace(/\s/g, '-') + id,
      shortDescription,
      description: `Event ${id} description`,
      startingPrice: price, currency,
      openDate: dr.from,
      closeDate: dr.to,
      location: 'London',
      category: 'Antiques',
      image: `https://picsum.photos/id/${id}/200/300`
    };
  }
}
