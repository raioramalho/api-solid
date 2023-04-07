export class CustomError extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.code = code
    // this.name = 'CustomError'
    // Define a propriedade 'code' com o valor fornecido como argumento
  }
}
