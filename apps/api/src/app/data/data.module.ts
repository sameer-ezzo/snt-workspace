import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
    controllers: [ApiController],
    imports: [
        MongooseModule.forFeature([], 'SNT_DB')
    ],
    providers: [ApiService],
    exports: [ApiService, MongooseModule]
})
export class DataModule { }