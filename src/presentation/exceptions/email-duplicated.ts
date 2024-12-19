import { BaseException } from "./base-exception";

export class EmailDuplicatedException extends BaseException {
  constructor() {
    super(400, "Email duplicado...");
  }
}
