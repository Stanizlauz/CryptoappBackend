import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UploadfilesController } from 'src/uploadfiles/uploadfiles.controller';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule
  ],
  controllers: [UserController, UploadfilesController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
