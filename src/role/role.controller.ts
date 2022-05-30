import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Get()
    async getall() {
        return this.roleService.all();
    }

    @Post()
    async create(
        @Body('name') name: string,
        @Body('permissions') ids: number[]
    ) {
        return this.roleService.create({
            name,
            permissions: ids.map(id => ({ id }))
        });
    }
}
