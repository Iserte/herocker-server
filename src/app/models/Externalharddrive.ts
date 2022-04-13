import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExternalHardDrive {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  size!: string;

  @Column()
  price!: number;
}
