import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cracker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  version!: string;

  @Column()
  size!: string;
}
