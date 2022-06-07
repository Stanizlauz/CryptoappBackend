import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './role.decorator';
import { Roles } from './role.enum';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

// @UseGuards(JwtAuthGuard)
    @Get()
    //@Role(Roles.Admin)
    async getall() {
        return this.roleService.all();
    }

    @Post()
    //@Role(Roles.Admin)
    async create(
        @Body('name') name: string,
    ) {
        return this.roleService.create({
            name
        });
    }
}
