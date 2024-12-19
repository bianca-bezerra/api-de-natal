import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DrawService } from "../../application/draw.service";

@injectable()
export class DrawController {
    constructor(private drawService: DrawService) { }

    public create = async (request: Request, response: Response) => {
        const { groupId } = request.body;
        const draw = await this.drawService.createDraw(groupId)
        response.status(201).json(draw);
    }


}

export default container.resolve(DrawController);
