import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { LoginDTO } from './models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, response, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from './jwt-auth.guard';

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
        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNo: body.phoneNo,
            gender: body.gender,
            address: body.address,
            dateOfBirth: body.dateOfBirth,
            identityNumber: body.identityNumber,
            password: hashed,
            picture: `http://localhost:8000/api/${file.path}`,
            role: { id: 1 }
        });
    }

    @Post("login")
    async login(
        @Body() body: LoginDTO,
        @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.findOne({ email: body.email },["role"]);
        if (!user) {
            throw new NotFoundException("User not found");
        } else {

            if (!await bcrypt.compare(body.password, user.password)) {
                throw new BadRequestException("Invalid Credentials");
            }
            // if (body.password !== user.password) {
            //     throw new BadRequestException("Invalid Credentials");
            // }
            const payload = { username: user.email, sub: user.id };
            const jwtToken = await this.jwtservice.signAsync(payload);
            response.cookie("jwt", jwtToken, { httpOnly: true })
            return {
                role:user?.role?.name,
                email:user?.email,
                name: `${user?.firstName} ${user?.lastName}`,
                access_token: jwtToken
            };
        }
    }

    // @UseGuards(AuthGuard)
    @UseGuards(JwtAuthGuard)
    @Get("user")
    async user(@Req() request: Request) {
        // const loggedInUser = await this.authService.loggedInUser(request);
        // const usee= this.userService.findOne({ loggedInUser })
        return request.user;
        // return request.user;

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
