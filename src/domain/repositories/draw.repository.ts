import { FindManyOptions } from "typeorm";
import { Draw } from "../entities/draw.entity";
import { BaseRepository } from "./base.repository";

export interface DrawRepository extends BaseRepository<Draw> {
  saveMany(draws: Draw[]): Promise<Draw[]>;

  findFriend(userId: number, groupId: number): Promise<Draw | null>;
}
