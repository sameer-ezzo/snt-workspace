import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', collection: 'users', schema: UserSchema }
    ], 'SNT_DB')
  ],
  exports: [UsersService, MongooseModule],
})
export class UsersModule { }
