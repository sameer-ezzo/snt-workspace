import { Module } from '@nestjs/common';


import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSeedsService } from './services/data-seeds.service';
import { DataModule } from './data/data.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { AntiqueSchema } from './schemas/antique.schema';
import { AuctionSchema } from './schemas/auction.schema';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [CartController, PaymentController],
  imports: [
    MongooseModule.forRoot('mongodb://mongo_container:27017/snt-db', { connectionName: 'SNT_DB', useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: 'Antique', collection: 'antiques', schema: AntiqueSchema },
      { name: 'Auction', collection: 'auctions', schema: AuctionSchema }
    ], 'SNT_DB'),
    DataModule,
    AuthModule,
    UsersModule,
    AdminModule,
  ],
  providers: [DataSeedsService],
})
export class AppModule { }
