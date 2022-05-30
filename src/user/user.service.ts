import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends CommonService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){
        super(userRepository)
    }



    
}
