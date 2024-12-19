import { inject, injectable, registry } from "tsyringe";
import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/repositories/user.repository";
import { TypeORMUserRepository } from "../persistence/typeorm/typeorm.user.repository";


@injectable()
@registry([{ token: "UserRepository", useClass: TypeORMUserRepository }])
export class UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async get(): Promise<User[]> {
    const users = await this.userRepository.list();
    return users;
  }
}
