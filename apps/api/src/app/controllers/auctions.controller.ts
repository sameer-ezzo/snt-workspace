import { Controller, Get } from '@nestjs/common';


import { AppService } from '../app.service';
import { dates, names } from './statics';

@Controller('auctions')
export class AuctionsController {
  private readonly _data = new Array(1000).fill({}).map((item, index) => ModelGenerator.createEvent(index + 1))
  constructor(private readonly appService: AppService) { }

  @Get('list')
  getData() {
    return this.appService.getData();
  }
}

class ModelGenerator {
  static createEvent(id: number): any {
    const index = id - 1
    const name = names[index % names.length]
    return {
      id,
      name,
      slug: name.toLowerCase().replace(/\s/g, '-') + id,
      description: `Event ${id} description`,
      price: Math.floor(Math.random() * 100),
      image: `https://picsum.photos/id/${id}/200/300`
    }
  }
}
