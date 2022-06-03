import { IsNotEmpty } from "class-validator";

export class CreateTransactionDTO{
    @IsNotEmpty()
    coin: string;

    @IsNotEmpty()
    amountDeposited: string;
}