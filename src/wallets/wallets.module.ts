import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { Wallets } from './wallet.entity';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Wallets]),
    CommonModule,
    AuthModule,
    UserModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService]
})
export class WalletsModule {}
