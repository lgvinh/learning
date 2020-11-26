import { Column, Entity, ManyToMany, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
@Unique(["name"])
export class Tag extends BaseEntity {

  @Column()
  name: string;
  
  @Column()
  description: string;

}
