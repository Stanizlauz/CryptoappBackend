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

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule, CommonModule, RoleModule, PermissionModule],
})
export class AppModule {}
