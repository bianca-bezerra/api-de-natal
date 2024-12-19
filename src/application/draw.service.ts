
import { inject, injectable, registry } from "tsyringe";
import { Draw } from "../domain/entities/draw.entity";
import { DrawRepository } from "../domain/repositories/draw.repository";
import { GroupRepository } from "../domain/repositories/group.repository";
import { TypeORMDrawRepository } from "../persistence/typeorm/typeorm.draw.repository";
import { TypeORMGroupRepository } from "../persistence/typeorm/typeorm.group.repository,";

@injectable()
@registry(
    [{ token: "DrawRepository", useClass: TypeORMDrawRepository },
    { token: "GroupRepository", useClass: TypeORMGroupRepository }
    ]
)
export class DrawService {
    constructor(
        @inject("DrawRepository") private drawRepository: DrawRepository,
        @inject("GroupRepository") private groupRepository: GroupRepository,
    ) { }

    async createDraw(groupId: number) {

        const group = await this.groupRepository.findById(groupId);
        if (!group) {
            throw new Error("Grupo não encontrado");
        }

        const groupParticipants = await this.groupRepository.findByIdParticipants(groupId)


        if (groupParticipants?.participants && groupParticipants?.participants.length < 2) {
            throw new Error("Não há participantes suficientes para realizar o sorteio...");
        }

        const draws: Draw[] = [];
        const shuffledUsers = [...groupParticipants?.participants || []].sort(() => Math.random() - 0.5);

        shuffledUsers.map((user, index) => {
            const friend = shuffledUsers[(index + 1) % shuffledUsers.length];
            draws.push(new Draw(group, user, friend));
        });

        await this.drawRepository.saveMany(draws);

        return draws;
    }

}
