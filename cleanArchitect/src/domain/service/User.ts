import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepo } from "../../infrastructure/repository";

@Service()
export class UserService {
  @InjectRepository(UserRepo)
  private userRepository: UserRepo;

  test() {
    return this.userRepository.getPagination(10, 0, "");
  }

}
