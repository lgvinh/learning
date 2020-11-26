import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, BeforeInsert} from "typeorm";
import { USER_ROLE, USER_STATUS } from "../common/enum";
import { Art } from "./Art";
import { BaseEntity } from "./BaseEntity";
import { hash, genSalt } from "bcrypt";

@Entity()
@Unique(["name", "email"])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null})
  avatar: string;

  @Column({ nullable: true, default: null})
  about: string;

  @Column({ default: USER_ROLE.USER })
  role: USER_ROLE

  @Column({ default: USER_STATUS.DEFAULT })
  status: USER_STATUS

  @OneToMany(type => Art, art => art.user)
  arts: Art[]

  @BeforeInsert()
  async hashPass() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }

}
