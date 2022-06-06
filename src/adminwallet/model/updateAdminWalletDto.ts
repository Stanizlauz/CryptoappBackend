import { IsNotEmpty } from "class-validator";

export class UpdateAdminWalletDTO {
    
    @IsNotEmpty()
    walletAddress: string;
}