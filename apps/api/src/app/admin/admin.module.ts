import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';
import { UsersModule } from '../users/users.module';
import { AntiquesController } from './antiques.controller';
import { AuctionsController } from './auctions.controller';


@Module({
    imports: [
        DataModule,
        AuthModule,
        UsersModule,
        AdminModule
    ],
    controllers: [AntiquesController, AuctionsController],
    providers: [],
    exports: []
})
export class AdminModule { }