import { Controller, Header, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { DataService } from './data.service';

@Controller('api')
export class ApiController {
  constructor(private readonly api: DataService) { }

  @Post('**')
  @Header('Cache-Control', 'none')
  async get(@Req() req: Request) {
    const { params } = req
    const { per_page, page, select } = req.body
    const path = params?.[0]

    const query = { ...req.body }
    delete query.per_page
    delete query.page
    delete query.select


    const result = await this.api.find<any>(path, { per_page, page, ...query }, select as string)
    return result
  }
}


