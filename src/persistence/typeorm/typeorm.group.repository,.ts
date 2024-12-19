
import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Group } from "../../domain/entities/group.entity";
import { GroupRepository } from "../../domain/repositories/group.repository";
import { User } from "../../domain/entities/user.entity";

export class TypeORMGroupRepository implements GroupRepository {
    private repository: Repository<Group>;

    constructor() {
        this.repository = AppDataSource.getRepository(Group);
    }

    async findById(id: number): Promise<Group | null> {
        const group = await this.repository.findOneBy({ id });
        return group
    }

    async findByIdParticipants(id: number): Promise<Group | null> {
        const group = await this.repository.findOne({
            where: { id: id },
            relations: ['participants'],
        });
        return group
    }

    async create(entity: Group): Promise<Group> {
        return await this.repository.save(entity);
    }

    async list(): Promise<Group[]> {
        return this.repository.find()
    }

    async update(entity: Group): Promise<Group> {
        return this.repository.save(entity);
    }

    async delete(entity: Group): Promise<void> {
        await this.repository.remove(entity);
    }
}
