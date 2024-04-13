import { RowDataPacket } from 'mysql2'

export interface ICargo extends RowDataPacket {
  id: number
  weight: number
  invoice_id: number
}
