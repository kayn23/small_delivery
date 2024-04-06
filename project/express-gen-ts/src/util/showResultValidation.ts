import { BadRequestEx, NotFoundEx } from './exceptions'

export default function <T>(value: Array<T>, quiet_mode = false) {
  if (value.length === 0) {
    throw new NotFoundEx()
  }
  if (value.length !== 1 && !quiet_mode) {
    throw new BadRequestEx()
  }
  if (value.length !== 1) return undefined
  return value
}
