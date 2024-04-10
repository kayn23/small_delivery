export class BadRequestEx extends Error {
  constructor() {
    super()
    this.message = 'bad_request'
  }
}
export class NotFoundEx extends Error {
  constructor() {
    super()
    this.message = 'not_found'
  }
}
export class ForbiddenEx extends Error {
  constructor() {
    super()
    this.message = 'forbidden'
  }
}
export class UnauthorizedEx extends Error {
  constructor() {
    super()
    this.message = 'unauthorized'
  }
}
