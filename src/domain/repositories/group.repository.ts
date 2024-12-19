import { Group } from "../entities/group.entity";
import { BaseRepository } from "./base.repository";

export interface GroupRepository extends BaseRepository<Group> {
    findById(id: number): Promise<Group | null>;
    findByIdParticipants(id: number): Promise<Group | null>;

}