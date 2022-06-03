import { IsNotEmpty } from "class-validator";

export class CreateWalletDTO{
    @IsNotEmpty()
    coin: string;

    @IsNotEmpty()
    walletAddress: string;
}