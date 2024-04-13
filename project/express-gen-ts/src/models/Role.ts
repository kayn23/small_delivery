import { RowDataPacket } from 'mysql2'

export interface IRole extends RowDataPacket {
  id: string | number
  name: string
}
