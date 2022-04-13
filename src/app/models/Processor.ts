import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PC } from "./PC";

@Entity()
export class Processor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cores!: number;

  @Column()
  clock!: string;

  @Column()
  price!: number;

  @OneToMany(() => PC, (pc) => pc.processor)
  pc!: PC[];
}
