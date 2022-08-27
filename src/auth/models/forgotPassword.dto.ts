import { IsNotEmpty } from "class-validator";

export class ForgotPasswordDTO {
    @IsNotEmpty()
    newPassword: string;

    @IsNotEmpty()
    confirmNewPassword: string;
}

export class ForgotPasswordEmailDTO {
    @IsNotEmpty()
    email: string;

}