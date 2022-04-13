import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hasher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  version!: string;

  @Column()
  size!: string;
}
