import { Module } from '@nestjs/common';
import { AntiquesController } from './controllers/antiques.controller';

import { AuctionsController } from './controllers/auctions.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AuctionsController, AntiquesController],
  providers: [AppService],
})
export class AppModule { }
