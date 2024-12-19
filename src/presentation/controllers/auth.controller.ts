import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { AuthService } from "../../application/auth.service";

@injectable()
export class AuthController {
    constructor(private authService: AuthService) { }

    public signup = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const user = await this.authService.signup({
            name,
            email,
            password,
        });
        res.status(201).json(user);
    };

    public signin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const data = await this.authService.signin({ email, password });

        res.json(data);
    };
}

export default container.resolve(AuthController);