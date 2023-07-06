import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { Auction } from '../data';
  
@Controller('admin/auctions')
// @UseGuards(AuthService)
export class AuctionsController {

  constructor(private auctionS: AuctionService) { }
 
  @Post('create')
  async create(@Body() auction: Auction){
   
    return await this.auctionS.create(auction)
    
  }

  @Post('edit')
  async edit(@Body() auction: Auction){
    return await this.auctionS.edit(auction)
  }

  @Delete('delete/:slug')
  async delete(@Param('slug') slug: string){
    return await this.auctionS.delete(slug)
  }

}