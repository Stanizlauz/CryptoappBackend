import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("AdminWallet")
export class AdminWallets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coin: string;

    @Column()
    walletAddress: string;

}