import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/snt-db', { connectionName: 'SNT_DB', useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema }
    ], 'SNT_DB')
  ]
})
export class UsersModule { }
