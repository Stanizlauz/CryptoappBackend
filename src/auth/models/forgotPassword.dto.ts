import { IsNotEmpty } from "class-validator";

export class ForgotPasswordDTO {
    @IsNotEmpty()
    newPassword: string;

    @IsNotEmpty()
    confirmNewPassword: string;
}