import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Comic } from "./Comic";

@Entity()
@Unique(["name"])
export class Chapter extends BaseEntity {

  @Column()
  name: string;

  @Column("varchar", { array: true })
  images: string[];

  @ManyToOne(type => Comic, comic => comic.chapters)
  comic: Comic;

}
