import { BaseException } from "./base-exception";

export class EntityNotFoundException extends BaseException {
  constructor(entity: string) {
    super(404, `${entity} não encontrado(a)`);
  }
}
