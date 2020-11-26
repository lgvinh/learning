import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";
import { COMIC_PROGRESS, COMIC_STATUS } from "../common/enum";
import { Author } from "./Author";
import { BaseEntity } from "./BaseEntity";
import { Chapter } from "./Chapter";
import { Tag } from "./Tag";

@Entity()
@Unique(["name"])
export class Comic extends BaseEntity {

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  subName: string
  
  @Column()
  description: string;

  @Column({ nullable: true, default: null })
  translator: string;

  @Column({ default: COMIC_STATUS.DEFAULT })
  status: COMIC_STATUS;

  @Column({ default: COMIC_PROGRESS.ON_GOING })
  progress: COMIC_PROGRESS;

  @OneToMany(type => Chapter, chap => chap.comic, {
    cascade: true
  })
  chapters: Chapter[];

  @ManyToMany(type => Author)
  @JoinTable()
  authors: Author[];

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];

}
