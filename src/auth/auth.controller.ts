import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { LoginDTO } from './models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, response, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtservice: JwtService,
        private authService: AuthService
    ) { }


    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match")
        }
        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.create({
            firstName: body.firstName,
            password: hashed
        });
    }

    @Post("login")
    async login(
        @Body() body: LoginDTO,
        @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.findOne({ email: body.email });
        if (!user) {
            throw new NotFoundException("User not found");
        } else {

            // if(!await bcrypt.compare(body.password, user.password)){
            //     throw new BadRequestException("Invalid Credentials");
            // }
            if (body.password !== user.password) {
                throw new BadRequestException("Invalid Credentials");
            }

            const jwtToken = await this.jwtservice.signAsync({ id: user.id });
            response.cookie("jwt", jwtToken, { httpOnly: true })
            return user;
        }
    }

    @UseGuards(AuthGuard)
    @Get("user")
    async user(@Req() request: Request) {
        const loggedInUser = await this.authService.loggedInUser(request);
        return this.userService.findOne({ loggedInUser })
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return {
            message: "Success"
        }
    }
}
