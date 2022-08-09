import { Controller, Get } from '@nestjs/common';
import { AntiqueModel } from 'libs/models/src';
import { AppService } from '../app.service';
import { dates, itemImages, names, photos, prices } from './statics';

@Controller('antiques')
export class AntiquesController {
  private readonly _data = new Array(1000).fill({}).map((item, index) => AntiqueGenerator.generate(index + 1))

  constructor(private readonly appService: AppService) { }

  @Get('list')
  getData(): { total: number, data: AntiqueModel[] } {
    return { total: this._data.length, data: this._data.slice(0, 10) };
  }
}


class AntiqueGenerator {
  static generate(id: number): any {
    const index = id - 1
    const name = names[index % names.length]
    const shortDesc = dates[index % dates.length]

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
    }
  }
}


