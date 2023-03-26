import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "feeds" })
export class Feed {
    @PrimaryGeneratedColumn('increment')
    idx: number;

    @Column({ type: "varchar", length: 1000 })
    content: string;

    @Column({ type: "varchar", length: 30 })
    owner: string;

    @Column({ type: "varchar", length: 50 })
    date: string;

    @Column()
    type: number;

}