import { Application } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import { BaseRoute } from "./base.route";


export class AuthRoutes extends BaseRoute {
    constructor(app: Application) {
        super(app, "Auth Routes","/auth");
    }

    configureRoutes(): Application {
        const controller = container.resolve(AuthController);

        this.app.post(`${this.suffix}/signup`, controller.signup);
        this.app.post(`${this.suffix}/signin`, controller.signin);

        return this.app;
    }
}