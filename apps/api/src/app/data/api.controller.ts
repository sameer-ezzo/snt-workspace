import { Controller, Header, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly api: ApiService) { }

  @Post('**')
  @Header('Cache-Control', 'none')
  async get(@Req() req: Request) {
    const { query, params } = req
    const { per_page, page, select } = query
    const path = params?.[0]

    const result = await this.api.find<any>(path, { per_page, page }, select as string)
    return result
  }
}


