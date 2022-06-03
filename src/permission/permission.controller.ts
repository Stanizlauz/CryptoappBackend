import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasPermission } from './hasPermission.decorator';
import { PermissionService } from './permission.service';

// @UseGuards(AuthGuard)
@Controller('permission')
export class PermissionController {
    constructor(private permissionService: PermissionService) { }

    @Get()
    @HasPermission('view_permissions')
    async getall() {
        return this.permissionService.all();
    }
}