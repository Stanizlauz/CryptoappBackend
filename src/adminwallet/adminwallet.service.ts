import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { AdminWallets } from './adminwallet.entity';

@Injectable()
export class AdminwalletService extends CommonService {
    constructor(
        @InjectRepository(AdminWallets) private readonly adminWalletRepository: Repository<AdminWallets>
    ){
        super(adminWalletRepository)
    }
}
