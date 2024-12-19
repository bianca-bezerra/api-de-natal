import { injectable, registry, inject } from "tsyringe"
import { Group } from "../domain/entities/group.entity"
import { GroupRepository } from "../domain/repositories/group.repository"
import { UserRepository } from "../domain/repositories/user.repository"
import { TypeORMGroupRepository } from "../persistence/typeorm/typeorm.group.repository,"
import { TypeORMUserRepository } from "../persistence/typeorm/typeorm.user.repository"


interface CreateGroupRequest {
    name: string
    description: string
    hostId: number
}

interface AddToGroupRequest {
    userId: number
    groupId: number
}

@injectable()
@registry(
    [{ token: "GroupRepository", useClass: TypeORMGroupRepository },
    { token: "UserRepository", useClass: TypeORMUserRepository },
    ]
)
export class GroupService {
    constructor(
        @inject("GroupRepository") private groupRepository: GroupRepository,
        @inject("UserRepository") private userRepository: UserRepository
    ) { }

    async createGroup({ name, description, hostId }: CreateGroupRequest) {
        const host = await this.userRepository.findById(hostId)

        if (!host) {
            throw new Error('Host nao encontrado')
        }
        const newGroup = new Group(name, description, host.id)
        const groupCreated = await this.groupRepository.create(newGroup)

        return groupCreated
    }

    async AddToGroup({ userId, groupId }: AddToGroupRequest) {
        const group = await this.groupRepository.findByIdParticipants(groupId)
        const user = await this.userRepository.findById(userId)
        if (!user || !group) {
            throw new Error('nao existe group ou usuario')
        }
        group?.participants.push(user)
        this.groupRepository.update(group)
        return group
    }
}