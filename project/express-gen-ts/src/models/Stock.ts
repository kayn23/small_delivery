import { RowDataPacket } from 'mysql2'

export interface IStock extends RowDataPacket {
  id: number
  name: string
  address: string
  city_id: number
}
export interface IStockInfo extends IStock {
  citi: string
}

function _new(id: number, name: string, address: string, city_id: number): IStock {
  return {
    id,
    name,
    address,
    city_id,
  } as IStock
}

export default {
  _new,
}
