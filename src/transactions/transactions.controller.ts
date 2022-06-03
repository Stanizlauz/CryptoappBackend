import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/role.decorator';
import { Roles } from 'src/role/role.enum';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTransactionDTO } from './model/createTransactionDto';
import { UpdateTransactionDTO } from './model/updateTransactionDto';
import { Transactions } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Get()
    async all(): Promise<Transactions[]> {
        return this.transactionService.all();
    }

    
    @Get(":id")
    @Role(Roles.Admin)
    async getOne(
        @Param("id") id: number
    ) {
        return this.transactionService.findOne({ id })
    }

    @Post()
    async create(
        @Body() body: CreateTransactionDTO,
        @Req() request: Request
    ): Promise<Transactions> {
        const loggedInUser = await this.authService.loggedInUser(request);
        const user = await this.userService.findOne( loggedInUser );
        return this.transactionService.create({
            coin: body.coin,
            amountDeposited: body.amountDeposited,
            userEmail: user.email,
            userName: `${user.firstName} ${user.lastName}`,
            userId: user.id,
            transactionStatus: "Pending"
        })
    }

    @Put(":id")
    @Role(Roles.Admin)
    async update(
        @Body() body: UpdateTransactionDTO,
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, {
            expectedPayout: body.expectedPayout,
            endDate: body.endDate,
            currentBalance: body.currentBalance
        });
        return this.transactionService.findOne({ id })
    }

    @Patch("approve/:id")
    @Role(Roles.Admin)
    async approve(
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, { transactionStatus: "Approved" });
        return this.transactionService.findOne({ id });
    }

    @Patch("cancel/:id")
    @Role(Roles.Admin)
    async cancel(
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, { transactionStatus: "Cancelled" });
        return this.transactionService.findOne({ id });
    }

    @Delete(":id")
    @Role(Roles.Admin)
    async delete(
        @Param("id") id: number
    ) {
        return this.transactionService.delete(id);
    }
}
