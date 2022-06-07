import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Coin } from './coins.entity';
import { CoinsService } from './coins.service';

@UseGuards(JwtAuthGuard)
@Controller('coins')
export class CoinsController {
    constructor(
        private coinService: CoinsService
    ) { }

    @Get()
    async all(): Promise<Coin[]> {
        return this.coinService.all();
    }

    @Post()
    async create(
        @Body('coin') coin: string,
    ) {
        return this.coinService.create({ coin })
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.coinService.delete(id);
    }
}
