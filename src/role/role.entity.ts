import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @ManyToMany(() => Permission, { cascade: true })
    // @JoinTable({
    //     name: "rolePermissions",
    //     joinColumn: { name: "roleId", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "permissionId", referencedColumnName: "id" }
    // })
    // permission: Permission[];
}