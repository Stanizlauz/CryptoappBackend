import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class CommonService {
    protected constructor(
        protected readonly repository: Repository<any>
    ) { }

    async all(): Promise<any[]> {
        return this.repository.find();
    }

    async create(data: any): Promise<any> {
        return this.repository.save(data);
    }

    async findOne(condition: any, relations=[]): Promise<any> {
        return this.repository.findOne(condition, {relations});
    }

    async update(id: number, data: any): Promise<any> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
