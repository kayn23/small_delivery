import { RowDataPacket } from 'mysql2'
import { IUser, UserRole } from './User'
import { IStockInfo } from './Stock'
import { ForbiddenEx } from '@src/util/exceptions'

export interface IInvoice extends RowDataPacket {
  id: number
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
}

function checkRight(invoice: IInvoice, user: IUser) {
  if ((invoice.recipient !== user.id || invoice.sender !== user.id) && user.role_id !== UserRole.admin)
    throw new ForbiddenEx()
}

export default {
  checkRight,
}
