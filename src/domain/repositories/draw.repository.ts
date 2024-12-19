
import { FindManyOptions } from "typeorm";
import { Draw } from "../entities/draw.entity";
import { BaseRepository } from "./base.repository";

export interface DrawRepository extends BaseRepository<Draw> {

    saveMany(draws: Draw[]): Promise<Draw[]>

    // findByGroupId(groupId: number): Promise<Draw | null>;

    findByUser(userId: number): Promise<Draw | null>;
    
    // find(options: FindManyOptions<Draw>): Promise<Draw[]>

}
