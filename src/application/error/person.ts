export class PersonNotFoundError extends Error {
  constructor (field: string) {
    super(`Person not found with value ${field}`)
    this.name = 'PersonNotFoundError'
    this.stack = `Person not found with value ${field}`
  }
}
