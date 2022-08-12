import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSeedsService } from './services/data-seeds.service';
import { DataModule } from './data/data.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/snt-db', { connectionName: 'SNT_DB', useNewUrlParser: true }),
    DataModule,
    AuthModule,
    UsersModule,
    AdminModule,
  ],
  providers: [AppService, DataSeedsService],
})
export class AppModule { }
