import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Wallets } from './wallet.entity';

@Injectable()
export class WalletsService extends CommonService {
    constructor(
        @InjectRepository(Wallets) private readonly walletRepository: Repository<Wallets>
    ) {
        super(walletRepository)
    }
}
