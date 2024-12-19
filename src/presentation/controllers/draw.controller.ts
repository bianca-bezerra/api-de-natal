import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DrawService } from "../../application/draw.service";

@injectable()
export class DrawController {
  constructor(private drawService: DrawService) {}

  public create = async (request: Request, response: Response) => {
    const id = request.params.id;

    const draw = await this.drawService.createDraw(Number(id));
    response.status(201).json(draw);
  };

  public getSecretFriend = async (request: Request, response: Response) => {
    const groupId = request.params.groupId;
    const userId = request.params.userId;

    const friend = await this.drawService.getSecretFriend(
      Number(userId),
      Number(groupId)
    );
    response.status(200).json(friend);
  };
}

export default container.resolve(DrawController);
