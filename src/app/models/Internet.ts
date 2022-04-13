import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PC } from "./PC";

@Entity()
export class Internet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  download!: string;

  @Column()
  upload!: string;

  @Column()
  price!: number;

  @OneToMany(() => PC, (pc) => pc.internet)
  pc!: PC[];
}
