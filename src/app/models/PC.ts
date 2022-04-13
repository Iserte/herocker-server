import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HardDrive } from "./Harddrive";
import { Internet } from "./Internet";
import { Memory } from "./Memory";
import { Processor } from "./Processor";
import { User } from "./User";

@Entity()
export class PC {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ip!: string;

  @ManyToOne(() => Processor, (processor) => processor.pc)
  processor!: Processor;

  @ManyToOne(() => HardDrive, (harddrive) => harddrive.pc)
  harddrive!: HardDrive;

  @ManyToOne(() => Memory, (memory) => memory.pc)
  memory!: Memory;

  @ManyToOne(() => Internet, (internet) => internet.pc)
  internet!: Internet;

  @OneToOne(() => User, (user) => user.pc)
  @JoinColumn()
  user!: User;
}
