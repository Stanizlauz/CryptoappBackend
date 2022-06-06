import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UploadfilesController } from './uploadfiles/uploadfiles.controller';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission/permission.guard';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { RolesGuard } from './role/role.guard';
import { CoinsModule } from './coins/coins.module';
import { AdminwalletModule } from './adminwallet/adminwallet.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule, CommonModule, RoleModule, PermissionModule, WalletsModule, TransactionsModule, CoinsModule, AdminwalletModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
