import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AdminwalletController } from './adminwallet.controller';
import { AdminWallets } from './adminwallet.entity';
import { AdminwalletService } from './adminwallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminWallets]),
    CommonModule
  ],
  controllers: [AdminwalletController],
  providers: [AdminwalletService]
})
export class AdminwalletModule { }
