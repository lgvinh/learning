import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({ type: "timestamp without time zone", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true, type: "timestamp without time zone" })
  deletedAt: Date;

}
