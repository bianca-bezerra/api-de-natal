import { inject, injectable, registry } from "tsyringe";
import { Group } from "../domain/entities/group.entity";
import { GroupRepository } from "../domain/repositories/group.repository";
import { UserRepository } from "../domain/repositories/user.repository";
import { TypeORMGroupRepository } from "../persistence/typeorm/typeorm.group.repository,";
import { TypeORMUserRepository } from "../persistence/typeorm/typeorm.user.repository";
import { EntityNotFoundException } from "../presentation/exceptions/entity-not-found";

interface CreateGroupRequest {
  name: string;
  description: string;
  hostId: number;
}

interface AddToGroupRequest {
  userId: number;
  groupId: number;
}

@injectable()
@registry([
  { token: "GroupRepository", useClass: TypeORMGroupRepository },
  { token: "UserRepository", useClass: TypeORMUserRepository },
])
export class GroupService {
  constructor(
    @inject("GroupRepository") private groupRepository: GroupRepository,
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async createGroup({ name, description, hostId }: CreateGroupRequest) {
    const host = await this.userRepository.findById(hostId);

    if (!host) {
      throw new EntityNotFoundException("Usuário Host");
    }
    const newGroup = new Group(name, description, host.id);
    const groupCreated = await this.groupRepository.create(newGroup);

    return groupCreated;
  }

  async AddToGroup({ userId, groupId }: AddToGroupRequest) {
    const group = await this.groupRepository.findByIdParticipants(groupId);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundException("Usuário");
    }
    if (!group) {
      throw new EntityNotFoundException("Grupo");
    }
    group?.participants.push(user);
    this.groupRepository.update(group);
    return group;
  }

  async listGroup() {
    const groups = await this.groupRepository.list();
    return groups;
  }
}
