import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { confirmEmailLink } from 'src/sendemail/confirmEmailLink';
import { sendEmail } from 'src/sendemail/sendEmail';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDTO } from './models/changePassword.dto';
import { LoginDTO } from './models/login.dto';
import { RegisterDto } from './models/register.dto';

@ApiTags("Auth")
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtservice: JwtService
    ) { }


    @Post('register')
    @UseInterceptors(FileInterceptor('picture', {
        storage: diskStorage({
            destination: "./uploads",
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async register(
        @Body() body: RegisterDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match")
        }
        const hashed = await bcrypt.hash(body.password, 12);
        // return this.userService.create({
        //     firstName: body.firstName,
        //     lastName: body.lastName,
        //     email: body.email,
        //     phoneNo: body.phoneNo,
        //     gender: body.gender,
        //     address: body.address,
        //     dateOfBirth: body.dateOfBirth,
        //     identityNumber: body.identityNumber,
        //     password: hashed,
        //     picture: `https://nest-api-investment.herokuapp.com/api/uploads/${file.filename}`,
        //     role: { id: 2 }
        // });
        const creatUser: User = await this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNo: body.phoneNo,
            gender: body.gender,
            address: body.address,
            dateOfBirth: body.dateOfBirth,
            identityNumber: body.identityNumber,
            password: hashed,
            picture: `https://nest-api-investment.herokuapp.com/api/uploads/${file.filename}`,
            role: { id: 2 }
        });

        sendEmail(body.email, creatUser.firstName, confirmEmailLink(creatUser.id))
        return { successmessage: "Registration successful, check mail to verify registration." }
    }

    @Post("login")
    async login(
        @Body() body: LoginDTO,
        @Res({ passthrough: true }) response: Response) {
        const user: User = await this.userService.findOne({ email: body.email }, ["role"]);
        if (!user) {
            return { errormessage: "Invalid Credentials" }
        } else {

            if (!await bcrypt.compare(body.password, user.password)) {
                return { errormessage: "Invalid Credentials" }
            } else if (!user?.confirmedUser) {
                return { errormessage: "Verify email" }
            }
            const payload = { username: user.email, sub: user.id };
            const jwtToken = await this.jwtservice.signAsync(payload);
            // response.cookie("jwt", jwtToken, { httpOnly: true })
            return {
                role: user?.role?.name,
                email: user?.email,
                id: user?.id,
                picture: user?.picture,
                name: `${user?.firstName} ${user?.lastName}`,
                access_token: jwtToken,
                successmessage: "Login successful"
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("changepassword")
    async changePassword(
        @Body() body: ChangePasswordDTO,
        @Req() request: Request
    ) {
        // const loggedInUser = await this.authService.loggedInUser(request);
        console.log(request.user)
        const user: User = await this.userService.findOne(request.user["id"]);
        if (!user) {
            return { errormessage: "Invalid Credentials" }
        } else {

            if (!await bcrypt.compare(body.oldPassword, user.password)) {
                return { errormessage: "Invalid Credentials" }
            }
            if (body.newPassword !== body.confirmNewPassword) {
                return { errormessage: "Passwords do not match" }
            }
            const hashed = await bcrypt.hash(body.newPassword, 12);
            const updatePassword = await this.userService.update(user.id, { password: hashed })
            return { successmessage: "Password updated successfully!" }
            // return user;
        }
    }

    // @UseGuards(AuthGuard)
    @UseGuards(JwtAuthGuard)
    @Get("user")
    async user(@Req() request: Request) {
        // sendEmail("giatest134@yopmail.com", "Rita", `http:localhost:3000/user/confirm/3`)
        return request.user;
        // return request.user;

    }
    @Post('user/confirm/:id')
    async confirmEmail(@Param('id') id: string) {
        const user: User = await this.userService.findOne(Number(id))
        await this.userService.update(Number(id), { confirmedUser: true })
        return "Confirmed"
    }
    // @UseGuards(AuthGuard)
    // @Post("logout")
    // async logout(@Res({ passthrough: true }) response: Response) {
    //     response.clearCookie('jwt');
    //     return {
    //         message: "Success"
    //     }
    // }
}
