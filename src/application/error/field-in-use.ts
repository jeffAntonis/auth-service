export class FieldInUseError extends Error {
  constructor (field: string) {
    super(`The received ${field} is already in use`)
    this.name = 'FieldInUseError'
    this.stack = `The received ${field} is already in use`
  }
}
