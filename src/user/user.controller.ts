import { Body, Controller, Delete, Get, Param, Put, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/role/role.decorator';
import { Roles } from 'src/role/role.enum';
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
    async update(@Param('id') id: number,
        @Body() body: UserUpdateDto) {

        await this.userService.update(id, body);
        return this.userService.findOne({ id })
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
