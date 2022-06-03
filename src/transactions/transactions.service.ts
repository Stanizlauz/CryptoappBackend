import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Transactions } from './transaction.entity';

@Injectable()
export class TransactionsService extends CommonService {
    constructor(
        @InjectRepository(Transactions) private readonly transactionRepository: Repository<Transactions>
    ) {
        super(transactionRepository)
    }

}
