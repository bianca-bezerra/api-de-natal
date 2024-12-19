import { Application } from "express";

export abstract class BaseRoute {

    constructor(protected app: Application, protected name: string, protected suffix: string = "") {
        this.configureRoutes();
    }

    getName() {
        return this.name
    }

    abstract configureRoutes(): Application;
}
