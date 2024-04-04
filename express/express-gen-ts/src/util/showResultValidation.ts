import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { IRes } from '@src/routes/types/express/misc'

export default function <T>(value: Array<T>, res: IRes): boolean {
  if (value.length === 0) {
    res.sendStatus(HttpStatusCodes.NOT_FOUND)
    return false
  }
  if (value.length !== 1) {
    res.sendStatus(HttpStatusCodes.BAD_REQUEST)
    return false
  }
  return true
}
