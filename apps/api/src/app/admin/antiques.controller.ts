import { Body, Controller, Delete, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { AntiqueService } from './antique.service';
import { Antique } from '../data/schemas/antique.schema';
import { Request } from 'express';

@Controller('admin/antiques')
// @UseGuards(AuthService)
export class AntiquesController {

  constructor(private antiqueS: AntiqueService) { }
 
  @Post('create')
  async create(@Body() antique: Antique){
   
    return await this.antiqueS.create(antique)
    
  }

  @Post('edit')
  async edit(@Body() antique: Antique){
    return await this.antiqueS.edit(antique)
  }
  @Delete('delete/:slug')
  async delete(@Param('slug') slug: string){
    return await this.antiqueS.delete(slug)
  }

}

