import {Entity,PrimaryGeneratedColumn,Column} from "typeorm";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({unique:true})
    email:string;

    @Column()
    // @Exclude()
    password:string;

}