import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/role/role.decorator';
import { Roles } from 'src/role/role.enum';
import { AdminWallets } from './adminwallet.entity';
import { AdminwalletService } from './adminwallet.service';
import { CreateAdminWalletDTO } from './model/createAdminWalletDto';
import { UpdateAdminWalletDTO } from './model/updateAdminWalletDto';
@ApiBearerAuth()
@ApiTags("Adminwallet")
@UseGuards(JwtAuthGuard)
//@Role(Roles.Admin)
@Controller('adminwallet')
export class AdminwalletController {
    constructor(
        private adminWalletService: AdminwalletService
    ) { }

    @Get()
    async all(): Promise<AdminWallets[]> {
        return this.adminWalletService.all();
    }

    @Get(":id")
    async getOne(@Param("id") id: number) {
        return this.adminWalletService.findOne({ id });
    }

    @Post()
    async create(
        @Body() body: CreateAdminWalletDTO,
    ) {
        return this.adminWalletService.create({
            coin: body.coin,
            walletAddress: body.walletAddress,
            successmessage: "Wallet successfully created"
        })
    }

    @Put(":id")
    async update(
        @Param("id") id: number,
        @Body() body: UpdateAdminWalletDTO
    ) {
        await this.adminWalletService.update(id, { walletAddress: body.walletAddress })
        return { successmessage: "Wallet successfully updated" };
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        await this.adminWalletService.delete(id);
        return { successmessage: "Wallet successfully deleted" }
    }
}
