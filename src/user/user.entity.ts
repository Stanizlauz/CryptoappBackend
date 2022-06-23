import { Exclude } from "class-transformer";
import { Role } from "src/role/role.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phoneNo: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    picture: string;

    @Column({ nullable: true })
    identityNumber: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: false })
    confirmedUser: boolean;

    @ManyToOne(() => Role)
    role: Role;

}