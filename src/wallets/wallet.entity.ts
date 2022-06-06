import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Wallets")
export class Wallets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coin: string;

    @Column()
    walletAddress: string;

    @Column()
    userId: string;
}