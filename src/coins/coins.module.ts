import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { CoinsController } from './coins.controller';
import { Coin } from './coins.entity';
import { CoinsService } from './coins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coin]),
    CommonModule
  ],
  controllers: [CoinsController],
  providers: [CoinsService]
})
export class CoinsModule {}
