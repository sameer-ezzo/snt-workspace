
import mongoose from 'mongoose';
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
  static generate(antiques: { _id: any, name: any }[]): Partial<Auction>[] {
    return new Array(antiques.length).fill({}).map((item, index) => AuctionGenerator.generateOne(index + 1, antiques[index]));
  }
  static generateOne(id: number, antique: { _id: string, name: string }): Partial<Auction> {
    const index = id - 1;
    const name = names[index % names.length].trim();
    const shortDescription = dates[index % dates.length].trim();
    const currency = prices[index % prices.length].substring(0, 1).trim()
    const p = prices[index % prices.length].substring(1).replace(',', '').trim()
    const price = parseInt(p)
    const dr = getRandomDateRange()
    const r = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: name + id,
      slug: name.toLowerCase().replace(/\s/g, '-') + id,
      shortDescription,
      description: `Event ${id} description`,
      startingPrice: price, currency,
      openDate: dr.from,
      closeDate: dr.to,
      address: 'London',
      category: 'Auction',
      antique: { aid: antique._id, name: antique.name },
      status: id % 3 === 0 ? 'open' : id % 4 === 0 ? 'sold' : 'closed',
      contactInfo: { phone: '000000000000', email: 'email@email.cemail', name: 'no name' },
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34042.39268681353!2d28.935154894528782!3d41.04820413371837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab79d7f133593%3A0xb9182e0040343f01!2sMandarin%20Oriental%20Bosphorus%2C%20Istanbul!5e0!3m2!1sen!2str!4v1687597112202!5m2!1sen!2str'
    }

    console.log(antique._id, r.antique)

    return r
  }
}
