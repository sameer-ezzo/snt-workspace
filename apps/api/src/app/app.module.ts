import { Module } from '@nestjs/common';


import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSeedsService } from './data/services/data-seeds.service';
import { DataModule } from './data/data.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { AntiqueSchema } from './data/schemas/antique.schema';
import { AuctionSchema } from './data/schemas/auction.schema';
import { PaymentController } from './payment.controller';
import { AntiqueService } from './admin/antique.service';

@Module({
  controllers: [CartController, PaymentController],
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/snt-db", {
      connectionName: "SNT_DB",
      useNewUrlParser: true,
    }),
    DataModule,
    AuthModule,
    UsersModule,
    AdminModule,
  ],
  providers: [DataSeedsService],
})
export class AppModule { }
