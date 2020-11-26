import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Art extends BaseEntity {

  @Column()
  name: string;

  @Column()
  image: string;
  
  @Column()
  description: string;

  @ManyToOne(type => User, user => user.arts, {
    cascade: true
  })
  user: User

}