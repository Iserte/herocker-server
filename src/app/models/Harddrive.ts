import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PC } from "./PC";

@Entity()
export class HardDrive {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  size!: string;

  @Column()
  price!: number;

  @OneToMany(() => PC, (pc) => pc.harddrive)
  pc!: PC[];
}
