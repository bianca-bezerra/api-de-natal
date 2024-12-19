export interface HashProvider {
    hash(payload: string): Promise<string>;
    verify(hash: string, payload: string): Promise<boolean>;
}