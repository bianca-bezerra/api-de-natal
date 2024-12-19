import { Request, Response } from "express";

import { container, injectable } from "tsyringe";
import { GroupService } from "../../application/group.service";

@injectable()
export class GroupController {
    constructor(private groupService: GroupService) { }

    public create = async (request: Request, response: Response) => {
        const { name, description, hostId } = request.body;
        const group = await this.groupService.createGroup({ name, description, hostId });
        response.status(201).json(group);
    }
    public addUserToGroup = async (request: Request, response: Response) => {
        const { userId, groupId } = request.body
        const groupUpdated = await this.groupService.AddToGroup({ userId, groupId })
        response.status(200).json(groupUpdated);
    }
}

export default container.resolve(GroupController);
