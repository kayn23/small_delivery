import { RowDataPacket } from 'mysql2'

export interface ICity extends RowDataPacket {
  id: number
  name: string
}
