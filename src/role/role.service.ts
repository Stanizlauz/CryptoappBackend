import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends CommonService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository:Repository<Role>
    ){
        super(roleRepository)
    }

}
