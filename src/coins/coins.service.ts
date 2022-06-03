import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Coin } from './coins.entity';

@Injectable()
export class CoinsService extends CommonService {
    constructor(
        @InjectRepository(Coin) private readonly coinRepository: Repository<Coin>
    ) {
        super(coinRepository)
    }
}
