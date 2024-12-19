import { container } from "tsyringe";
import { GroupRepository } from "./domain/repositories/group.repository";
import { TypeORMGroupRepository } from "./persistence/typeorm/typeorm.group.repository,";
import { HashProvider } from "./application/providers/hash.provider";
import { UserRepository } from "./domain/repositories/user.repository";
import { BCryptHashProvider } from "./infrastructure/bcrypt.provider";
import { JWTTokenProvider } from "./infrastructure/jwt.provider";
import { TypeORMUserRepository } from "./persistence/typeorm/typeorm.user.repository";
import { TokenProvider } from "./application/providers/token.provider";


container.register<GroupRepository>("GroupRepository", {
    useClass: TypeORMGroupRepository
});

container.register<UserRepository>("UserRepository", {
    useClass: TypeORMUserRepository
});

container.register<HashProvider>("HashProvider", {
    useClass: BCryptHashProvider
});

container.register<TokenProvider>("TokenProvider", {
    useClass: JWTTokenProvider
});