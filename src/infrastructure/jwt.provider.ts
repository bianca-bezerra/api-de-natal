import { sign, verify } from "jsonwebtoken";
import { TokenProvider } from "../application/providers/token.provider";

export class JWTTokenProvider implements TokenProvider {
  encode(data: string, expires: string): string {
    const token = sign({ sub: data }, "secret", { expiresIn: expires});
    return token;
  }

  decode(token: string): string {
    try {
      const decoded = verify(token, "secret");
      return decoded["sub"] as string;
    } catch (err) {
      throw new Error("Invalid token!");
    }
  }
}
