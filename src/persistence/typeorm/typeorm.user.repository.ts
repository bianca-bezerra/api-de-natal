import { Repository } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { AppDataSource } from "../../../data-source";


export class TypeORMUserRepository implements UserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }
    async findById(id: number): Promise<User | null> {
        const user = await this.repository.findOneBy({ id })
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email })
    }
    async create(entity: User): Promise<User> {
        console.log('entity do typerepo', entity)
        const user = await this.repository.save(entity)
        return user
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find()
        return users
    }
    update(entity: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(entity: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
}