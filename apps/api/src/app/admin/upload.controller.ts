import { Controller, Get, HttpException, HttpStatus, Inject, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync, statSync } from "fs";
import { join } from "path";
import { Response, Request } from 'express';


@Controller('storage')
export class StorageController {

    constructor(@Inject('UPLOAD_BASE') private readonly uploadBase: string) { }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: any) {
        return file.filename
    }


    //http://localhost:port/storage/1687691813184_kudra-cert-bg.png
    @Get('**')
    download(@Res() res: Response, @Req() req: Request) {
        console.log(req.path);
        const fileName = req.path.substring(req.path.indexOf('/storage/') + 9)
        console.log(fileName)

        const filePath = join(this.uploadBase, fileName)
        const fileExists = existsSync(filePath)

        if (!fileExists) throw new HttpException('File not found', HttpStatus.NOT_FOUND)

        const fileStream = createReadStream(filePath);
        fileStream.pipe(res);

        const fileStats = statSync(filePath);
        const fileMimeType = 'image/png'; // Provide the correct MIME type for your file

        res.set({
            'Content-Type': fileMimeType,
            'Content-Length': fileStats.size,
        });
    }
}