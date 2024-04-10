import type { IStockInfo } from './stock'
import type { IUser } from './user'

export interface IInvoice {
  id?: number | string
  sender: number
  recipient: number
  end_point: number
  status: InvoiceStatus
  price?: number
}

export interface IStatus {
  id: number | string
  name: string
}

export enum InvoiceStatus {
  new = 1,
  payment = 2,
  paid = 3,
  delivers = 4,
  received = 5,
  end = 6,
}
export function convertStatusToText(status: InvoiceStatus | number | string) {
  switch (status) {
    case InvoiceStatus.new:
      return 'Новый'
    case InvoiceStatus.payment:
      return 'Ожидается оплата'
    case InvoiceStatus.paid:
      return 'Оплачено'
    case InvoiceStatus.delivers:
      return 'Доставляется'
    case InvoiceStatus.received:
      return 'Доставлен в пвз'
    case InvoiceStatus.end:
      return 'Выполнен'
    default:
      'Неизвестный статус'
  }
}

export interface IInvoiceWithInfo extends IInvoice {
  recipient_info?: IUser
  sender_info?: IUser
  end_point_info?: IStockInfo
}
