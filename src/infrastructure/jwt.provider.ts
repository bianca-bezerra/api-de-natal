import { sign, verify } from 'jsonwebtoken';
import { TokenProvider } from '../application/providers/token.provider';


export class JWTTokenProvider implements TokenProvider {
    encode(data: string, expires: string): string {
        const token = sign({ sub: data }, "ElRsOt");

        return token;
    }

    decode(token: string): string {
        try {
            const decoded = verify(token, "ElRsOt");
            // to fix
            return decoded["sub"] as string;
        } catch (err) {
            throw new Error("Invalid token!");
        }
    }
}