import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Draw } from "../../domain/entities/draw.entity";
import { DrawRepository } from "../../domain/repositories/draw.repository";

export class TypeORMDrawRepository implements DrawRepository {
    private repository: Repository<Draw>;

    constructor() {
        this.repository = AppDataSource.getRepository(Draw);
    }

    async saveMany(draws: Draw[]): Promise<Draw[]> {
        return this.repository.save(draws);
    }

    async findByUser(userId: number): Promise<Draw | null> {
        return this.repository.findOne({
            where: { user: { id: userId } },
        });
    }
    create(entity: Draw): Promise<Draw> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Draw[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: Draw): Promise<Draw> {
        throw new Error("Method not implemented.");
    }
    delete(entity: Draw): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
