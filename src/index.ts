import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import '../data-source';
import { AuthRoutes } from "./presentation/routes/auth.route";
import { BaseRoute } from "./presentation/routes/base.route";
import { DrawRoute } from "./presentation/routes/draw.route";
import { GroupRoute } from "./presentation/routes/group.route";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (request: Request, response: Response) => {
    response.send("hello world!!");
});

// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log(`Interceptou....: ${req.path} - ${req.method}`);
//     // res.status(401).json({ detail: "Acesso negado!" });
//     next();
//   });  

// Inicializando as rotas
const routes: Array<BaseRoute> = [
    new GroupRoute(app),
    new AuthRoutes(app),
    new DrawRoute(app)
];

app.listen(PORT, () => {
    for (let route of routes) {
        console.log(`> ${route.getName()} Configuradas`);
    }
    console.log(`Server rodando em 127.0.0.1:${PORT}`);
});
