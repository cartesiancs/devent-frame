import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn('increment')
    idx: number;

    @Column({ type: "varchar", length: 20 })
    userId: string;

    @Column({ type: "varchar", length: 400 })
    userPassword: string;

    @Column({ nullable: false })
    userEmail: string;

    @Column()
    userAuthLevel: number;

}