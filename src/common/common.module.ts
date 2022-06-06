import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './common.service';

@Module({
    imports: [
    JwtModule.register({
      secret: "jhgj34hr7y34rhbejfefy84y8y89y38ry83yr3i4hrb44t783t3y483732t",
      signOptions: { expiresIn: '1d' },
    }),
    ],
    exports: [
        JwtModule
    ],
})
export class CommonModule {}
