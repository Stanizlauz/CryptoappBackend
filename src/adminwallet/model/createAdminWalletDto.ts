import { IsNotEmpty } from "class-validator";

export class CreateAdminWalletDTO {
    @IsNotEmpty()
    coin: string;

    @IsNotEmpty()
    walletAddress: string;
}