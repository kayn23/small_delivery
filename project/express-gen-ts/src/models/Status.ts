import { RowDataPacket } from 'mysql2'

export interface IStatus extends RowDataPacket {
  id: number
  name: string
}
