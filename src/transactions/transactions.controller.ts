import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/role/role.decorator';
import { Roles } from 'src/role/role.enum';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTransactionDTO } from './model/createTransactionDto';
import { UpdateTransactionDTO } from './model/updateTransactionDto';
import { Transactions } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@UseGuards(JwtAuthGuard)
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

    @Get("user/transaction")
    async allTransactionsOneUser(@Req() request: Request): Promise<Transactions[]> {
        const loggedInUser = request.user["id"];
        return this.transactionService.customQuery(loggedInUser);
    }


    @Get(":id")
    //@Role(Roles.Admin)
    async getOne(
        @Param("id") id: number
    ) {
        return this.transactionService.findOne({ id })
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('picture', {
        storage: diskStorage({
            destination: "./uploads",
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async create(
        @Body() body: CreateTransactionDTO,
        @Req() request: Request,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Transactions> {
        const loggedInUser = request.user["id"];
        const user = await this.userService.findOne(loggedInUser);
        // const loggedInUser = await this.authService.loggedInUser(request);
        return this.transactionService.create({
            coin: body.coin,
            amountDeposited: body.amountDeposited,
            userEmail: user.email,
            userName: `${user.firstName} ${user.lastName}`,
            userId: user.id,
            picture: `http://localhost:8000/api/${file.path}`,
            transactionStatus: "Pending"
        })
    }

    @Put(":id")
    //@Role(Roles.Admin)
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
    //@Role(Roles.Admin)
    async approve(
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, { transactionStatus: "Approved" });
        return this.transactionService.findOne({ id });
    }

    @Patch("cancel/:id")
    //@Role(Roles.Admin)
    async cancel(
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, { transactionStatus: "Cancelled" });
        return this.transactionService.findOne({ id });
    }

    @Delete(":id")
    //@Role(Roles.Admin)
    async delete(
        @Param("id") id: number
    ) {
        return this.transactionService.delete(id);
    }
}
