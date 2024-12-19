import { inject, injectable, registry } from "tsyringe";
import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/repositories/user.repository";
import { BCryptHashProvider } from "../infrastructure/bcrypt.provider";
import { JWTTokenProvider } from "../infrastructure/jwt.provider";
import { TypeORMUserRepository } from "../persistence/typeorm/typeorm.user.repository";
import { HashProvider } from "./providers/hash.provider";
import { TokenProvider } from "./providers/token.provider";

interface SignUpCommandRequest {
    name: string;
    email: string;
    password: string;
}

interface SignInRequest {
    email: string;
    password: string;
}

interface SignInResponse {
    name: string;
    accessToken: string;
    refreshToken: string;
}

@injectable()
@registry(
    [{ token: "UserRepository", useClass: TypeORMUserRepository },
    { token: "HashProvider", useClass: BCryptHashProvider },
    { token: "TokenProvider", useClass: JWTTokenProvider }
    ]
)
export class AuthService {
    constructor(
        @inject("UserRepository") private userRepository: UserRepository,
        @inject("HashProvider") private hashProvider: HashProvider,
        @inject("TokenProvider") private tokenProvider: TokenProvider
    ) { }

    async signup({
        name,
        email,
        password,
    }: SignUpCommandRequest): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (user) {
            throw new Error('Email duplicado');
        }
        const hashedPass = await this.hashProvider.hash(password);

        const newUser = new User(name, email, hashedPass)
        const userCreated = await this.userRepository.create(
            newUser
        );

        return userCreated;
    }

    async signin(request: SignInRequest): Promise<SignInResponse> {
        const user = await this.userRepository.findByEmail(request.email);

        if (!user) {
            throw new Error("Usuário e/ou Senha incorreto(s)");
        }

        const isMatch = this.hashProvider.verify(user.password, request.password);

        if (!isMatch) {
            throw new Error("Usuário e/ou Senha incorreto(s)");
        }

        const accessToken = this.tokenProvider.encode(user.email, "15m");
        const refreshToken = this.tokenProvider.encode(user.email, "3d");

        return { name: user.name, accessToken, refreshToken };
    }
}