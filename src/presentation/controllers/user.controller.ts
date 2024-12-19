import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserService } from "../../application/user.service";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  public list = async (request: Request, response: Response) => {
    const users = await this.userService.get();
    response.status(200).json(users);
  };
}

export default container.resolve(UserController);
