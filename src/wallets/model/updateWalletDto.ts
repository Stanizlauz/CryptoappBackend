import { IsNotEmpty } from "class-validator";

export class UpdateWalletDTO{
    @IsNotEmpty()
    walletAddress?: string;
}