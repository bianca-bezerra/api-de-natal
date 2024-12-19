import { Application } from "express";
import { container } from "tsyringe";
import { GroupController } from "../controllers/group.controller";
import { BaseRoute } from "./base.route";

export class GroupRoute extends BaseRoute {
  constructor(app: Application) {
    super(app, "Group Route", "/grupos");
  }

  configureRoutes(): Application {
    const controller = container.resolve(GroupController);

    this.app.route(`${this.suffix}/criar`).post(controller.create);
    this.app.route(`${this.suffix}/adicionar`).post(controller.addUserToGroup);
    this.app.route(this.suffix).get(controller.list);

    return this.app;
  }
}
