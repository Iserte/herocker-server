import { AfterUpdate, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';

const BCRYPT_SALT = process.env.BCRYPT_SALT as string;

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
    username!: string;

  @Column()
    email!: string;

  @Column()
    password!: string;

  checkPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  async hashPassword(password?: string) {
    this.password = await bcrypt.hash(password || this.password, Number(BCRYPT_SALT));
  }

}
