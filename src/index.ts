import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "../data-source";
import { AuthRoutes } from "./presentation/routes/auth.route";
import { BaseRoute } from "./presentation/routes/base.route";
import { DrawRoute } from "./presentation/routes/draw.route";
import { GroupRoute } from "./presentation/routes/group.route";
import { UserRoute } from "./presentation/routes/user.route";
import { BaseException } from "./presentation/exceptions/base-exception";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (request: Request, response: Response) => {
  response.send("hello world!! it's working...");
});

const routes: BaseRoute[] = [
  new GroupRoute(app),
  new AuthRoutes(app),
  new DrawRoute(app),
  new UserRoute(app),
];

//app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//  if (err instanceof BaseException) {
//    res.status(err.statusCode).json({ detail: err.message });
//  }
//  next();
//});

app.listen(PORT, () => {
  for (let route of routes) {
    console.log(`> ${route.getName()} Configuradas`);
  }
  console.log(`Server rodando em 127.0.0.1:${PORT}`);
});
