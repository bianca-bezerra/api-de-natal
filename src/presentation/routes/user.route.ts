import { Application } from "express";
import { container } from "tsyringe";
import { DrawController } from "../controllers/draw.controller";
import { BaseRoute } from "./base.route";
import { UserController } from "../controllers/user.controller";

export class UserRoute extends BaseRoute {
  constructor(app: Application) {
    super(app, "User Route", "/users");
  }

  configureRoutes(): Application {
    const controller = container.resolve(UserController);

    this.app.route(this.suffix).get(controller.list);

    return this.app;
  }
}
