import { RowDataPacket } from 'mysql2'

export interface IInvoice extends RowDataPacket {
  id: number
  sender: number
  recipient: number
  end_point: number
  status: number
  price: number
}
