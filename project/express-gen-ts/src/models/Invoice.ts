import { RowDataPacket } from 'mysql2'
import { IUser, UserRole } from './User'
import { IStockInfo } from './Stock'
import { ForbiddenEx } from '@src/util/exceptions'
import { ICargo } from './Cargo'

export interface IInvoice extends RowDataPacket {
  id: number | string
  sender: number
  recipient: number
  end_point: number
  status: number
  price: number
}

export interface IInvoiceWithInfo extends IInvoice {
  recipient_info?: IUser
  sender_info?: IUser
  end_point_info?: IStockInfo
  cargoes?: ICargo[]
}

function checkRight(invoice: IInvoice, user: IUser) {
  if (user.role_id !== UserRole.admin) {
    if (invoice.recipient !== user.id && invoice.sender !== user.id) {
      throw new ForbiddenEx()
    }
  }
}

export default {
  checkRight,
}
