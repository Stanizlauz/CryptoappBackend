import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("coin")
export class Coin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coin: string;

}