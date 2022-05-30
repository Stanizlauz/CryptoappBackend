import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDTO } from './model/user.create.dto';
import { UserUpdateDto } from './model/userupdate.dto';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }

    @Post()
    async create(@Body() body: UserCreateDTO): Promise<User> {
        const password = await bcrypt.hash('1234', 12);

        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            password
        });
    }

    @Get(':id')
    async get(@Param('id') id: number) {

        return this.userService.findOne({ id })
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
