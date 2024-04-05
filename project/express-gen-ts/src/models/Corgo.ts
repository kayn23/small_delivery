import { RowDataPacket } from 'mysql2'

export interface ICargo extends RowDataPacket {
  id: number
  weight: number
  invoices_id: number
}
