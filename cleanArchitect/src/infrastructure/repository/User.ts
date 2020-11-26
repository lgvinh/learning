import { EntityRepository, Like, Repository } from "typeorm";
import { IUser } from "./interface/IUser";
import * as Entity from "../entity";
import { Service } from "typedi";

@Service()
@EntityRepository(Entity.User)
export class UserRepo extends Repository<Entity.User> implements IUser {

  createAndSave(entity: Entity.User) {
    return this.insert(entity);
  }

  async getPagination(limit?: number, skip?: number, keyword?: string) {
    const query = this
      .createQueryBuilder()
      .select()
      .limit(limit)
      .offset(skip)
      .where({
        name: Like(`%${(keyword && keyword.replace("%", "")) || ""}%`) 
      });
    const data = await query.getMany();
    const total = await this.count();
    return {
      pagination: {
        skip,
        limit,
        keyword: (keyword && keyword.replace("%", "")) || "",
        total
      },
      data
    };
  }

  getById(id: number) {
    return this.find({
      where: {id}
    });
  }

}
