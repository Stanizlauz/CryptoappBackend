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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: {
    //     service: "gmail",
    //     auth: {
    //       user: "rhitanene@gmail.com", // generated ethereal user
    //       pass: "yywfbkmdrymkqwlr", // generated ethereal password
    //     },
    //   },
    //   template: {
    //     dir: join(__dirname, 'sendemail'),
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../../', 'frontend/build'),
    // }),
    UserModule,
    TypeOrmModule.forRoot(config),
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    WalletsModule,
    TransactionsModule,
    CoinsModule,
    AdminwalletModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
