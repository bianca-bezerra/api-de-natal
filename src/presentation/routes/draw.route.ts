import { Application } from "express";
import { container } from "tsyringe";
import { DrawController } from "../controllers/draw.controller";
import { BaseRoute } from "./base.route";


export class DrawRoute extends BaseRoute {
    constructor(app: Application) {
        super(app, "Draw Route", '/sorteio');
    }

    configureRoutes(): Application {
        const controller = container.resolve(DrawController);

        this.app.route(`${this.suffix}/criar/:id`).post(controller.create);
        this.app
          .route(`${this.suffix}/meuamigo/:groupId/:userId`)
          .post(controller.getSecretFriend);

        return this.app;
    }
}