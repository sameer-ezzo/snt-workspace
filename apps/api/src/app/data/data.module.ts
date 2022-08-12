import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AntiqueSchema } from './schemas/antique.schema';


@Module({
    controllers: [ApiController],
    imports: [
        MongooseModule.forFeature([
            { name: 'antique', schema: AntiqueSchema },
            { name: 'auction', schema: AntiqueSchema },
            // { name: 'order', schema: UserSchema },
            // { name: 'address', schema: UserSchema },
        ], 'SNT_DB')
    ],
    providers: [ApiService],
    exports: [ApiService]
})
export class DataModule { }