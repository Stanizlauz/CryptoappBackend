import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import path, { extname, join } from 'path';
import { Observable } from 'rxjs';

@Controller()
export class UploadfilesController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: "./uploads",
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(`http://localhost:8000/api/${file.path}`)
        return {
            url: `http://localhost:8000/api/uploads/${file.filename}`
        }
    }

    @Get('uploads/:path')
    async getImage(
        @Param("path") path,
        @Res() res: Response
    ) {
        res.sendFile(path, { root: "uploads" })
        // console.log(res.sendFile('http://localhost:8000/api/uploads/' + path))
        // res.sendFile('http://localhost:8000/api/uploads/' + path)
    }
}
