import { compare, genSalt, hash } from "bcrypt"
import { HashProvider } from "../application/providers/hash.provider"

export class BCryptHashProvider implements HashProvider {
    async hash(payload: string): Promise<string> {
        const salt = await genSalt(10);
        const hashedPassword = await hash(payload, salt);
        return hashedPassword
    }

    async verify(hash: string, payload: string): Promise<boolean> {
        return await compare(payload, hash)
    }
}