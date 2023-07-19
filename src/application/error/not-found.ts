export class NotFoundError extends Error {
  constructor (field: string) {
    super(`The received ${field} is not found`)
    this.name = 'NotFoundError'
    this.stack = `The received ${field} is not found`
  }
}
