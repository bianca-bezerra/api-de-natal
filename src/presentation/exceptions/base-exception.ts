export class BaseException extends Error {
  constructor(
    public statusCode: number = 400,
    public detail: string = "Erro desconhecido"
  ) {
    super(detail);
  }
}
