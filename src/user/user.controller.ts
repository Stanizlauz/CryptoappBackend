import { Body, Controller, Delete, Get, Param, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserUpdateDto } from './model/userupdate.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    //admin only
    @Get()
    // //@Role(Roles.Admin)
    async all(): Promise<User[]> {
        return this.userService.all();
    }


    // @Post()
    // async create(@Body() body: UserCreateDTO): Promise<User> {
    //     const password = await bcrypt.hash('1234', 12);

    //     return this.userService.create({
    //         firstName: body.firstName,
    //         lastName: body.lastName,
    //         password
    //     });
    // }


    @Get(':id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({ id }, ["role"])
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('picture', {
        storage: diskStorage({
            destination: "./uploads",
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async update(@Param('id') id: number,
        @Body() body: UserUpdateDto, @UploadedFile() file: Express.Multer.File) {
        if (file?.filename) {
            let proPic = `https://nest-api-investment.herokuapp.com/api/uploads/${file.filename}`
            await this.userService.update(id, {
                firstName: body?.firstName,
                lastName: body?.lastName,
                phoneNo: body?.phoneNo,
                gender: body?.gender,
                dateOfBirth: body?.dateOfBirth,
                picture: proPic,
                identityNumber: body?.identityNumber
            });
            return { successmessage: "Success" }
        } else if (body?.identityNumber) {
            await this.userService.update(id, {
                identityNumber: body?.identityNumber
            });
            return { successmessage: "Success" }
        }
        await this.userService.update(id, {
            firstName: body?.firstName,
            lastName: body?.lastName,
            phoneNo: body?.phoneNo,
            gender: body?.gender,
            dateOfBirth: body?.dateOfBirth,
            identityNumber: body?.identityNumber
        });
        return { successmessage: "Success" }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
