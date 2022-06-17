import { Column, CreateDateColumn, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity("Transaction")
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coin: string;

    @Column()
    amountDeposited: number;

    @Column({nullable: true})
    currentBalance: number;

    @Column({nullable: true})
    expectedPayout: number;

    @Column()
    transactionStatus: string;

    @Column()
    @CreateDateColumn()
    startDate: Date;

    // @Column({nullable: true})
    // endDate: Date;

    @Column()
    userEmail: string;

    @Column()
    userName: string;
    
    @Column()
    picture: string;

    @Column()
    userId: string;
}