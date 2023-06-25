import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';
import { UsersModule } from '../users/users.module';
import { AntiquesController } from './antiques.controller';
import { AuctionsController } from './auctions.controller';
import { MulterModule } from '@nestjs/platform-express';
import { StorageController } from './upload.controller';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';



function createDirectoryIfNotExists(directoryPath) {
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory created: ${directoryPath}`);
    } else {
        console.log(`Directory already exists: ${directoryPath}`);
    }
}
const dest = join(__dirname, 'uploads')
createDirectoryIfNotExists(dest)

@Module({
    imports: [
        DataModule,
        AuthModule,
        UsersModule,
        AdminModule,
        MulterModule.register({
            dest: dest,
            storage: diskStorage({
                destination: function (req, file, cb) {
                    cb(null, dest)
                },
                filename: function (req, file, cb) {
                    const fn = Date.now() + '_' + file.originalname
                    cb(null, fn)
                }
            })
        }),
    ],
    controllers: [AntiquesController, AuctionsController, StorageController],
    providers: [
        { provide: 'UPLOAD_BASE', useValue: dest }
    ],
    exports: []
})
export class AdminModule { }