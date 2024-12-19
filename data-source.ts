import { DataSource } from "typeorm"
import { Draw } from "./src/domain/entities/draw.entity"
import { Group } from "./src/domain/entities/group.entity"
import { User } from "./src/domain/entities/user.entity"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "api-de-natal",
    synchronize: false,
    logging: true,
    entities: [Group, User, Draw],
    migrations: ["./src/persistence/typeorm/migrations/**/*.ts"],

})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })