import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateWalletDTO } from './model/createWalletDto';
import { UpdateWalletDTO } from './model/updateWalletDto';
import { Wallets } from './wallet.entity';
import { WalletsService } from './wallets.service';

@ApiTags("Wallets")
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
    constructor(
        private walletService: WalletsService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    // @Get()
    // async all(): Promise<Wallets[]> {
    //     return this.walletService.all();
    // }
    @Get()
    async all(@Req() request: Request): Promise<Wallets[]> {
        const loggedInUser = request.user["id"];
        const user = await this.userService.findOne({ id: loggedInUser }, ["role"])
        return this.walletService.customQuery(loggedInUser);
    }

    @Get(":id")
    async getOne(@Param("id") id: number) {
        return this.walletService.findOne({ id });
    }

    @Post()
    async create(
        @Body() body: CreateWalletDTO,
        @Req() request: Request
    ) {
        // const loggedInUser = await this.authService.loggedInUser(request);
        console.log(request.user)
        const user: User = await this.userService.findOne(request.user["id"]);
        if (!user.identityNumber) {
            return { message: "User not verified, add identity number" }
        } else {
            return this.walletService.create({
                coin: body.coin,
                walletAddress: body.walletAddress,
                userId: user.id
            })
        }
    }

    @Put(":id")
    async update(
        @Param("id") id: number,
        @Body() body: UpdateWalletDTO
    ) {
        await this.walletService.update(id, { walletAddress: body.walletAddress })
        return this.walletService.findOne({ id });
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.walletService.delete(id);
    }
}
