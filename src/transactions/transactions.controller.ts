import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
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

@ApiTags("Transactions")
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Get()
    async all(@Req() request: Request): Promise<Transactions[]> {
        const loggedInUser = request.user["id"];
        const user = await this.userService.findOne({ id: loggedInUser }, ["role"])
        if (user?.role?.name === Roles.Admin) {
            return this.transactionService.all();
        } else {
            return this.transactionService.customQuery(loggedInUser);
        }
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
    ) {
        const loggedInUser = request.user["id"];
        const user: User = await this.userService.findOne(loggedInUser);
        // const loggedInUser = await this.authService.loggedInUser(request);
        if (!user.identityNumber) {
            return { errormessage: "User not verified, add identity number" }
        } else {
            return this.transactionService.create({
                coin: body.coin,
                amountDeposited: body.amountDeposited,
                userEmail: user.email,
                userName: `${user.firstName} ${user.lastName}`,
                userId: user.id,
                currentBalance: body.amountDeposited,
                picture: `https://nest-api-investment.herokuapp.com/api/uploads/${file.filename}`,
                transactionStatus: "Pending",
                successmessage: "Success"
            })
        }
    }

    @Put(":id")
    //@Role(Roles.Admin)
    async update(
        @Body() body: UpdateTransactionDTO,
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, {
            expectedPayout: body.expectedPayout,
            // endDate: body.endDate,
            currentBalance: body.currentBalance
        });
        return { successmessage: "Successfully updated" }
    }

    @Patch("approve/:id")
    //@Role(Roles.Admin)
    async approve(
        @Param("id") id: number
    ) {
        await this.transactionService.update(id, { transactionStatus: "Active" });
        return { successmessage: "Successfully Approved" }
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
