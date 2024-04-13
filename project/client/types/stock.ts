export interface IStock {
  id?: number | string
  name: string
  address: string
  deleted?: boolean
  city_id: number | string
}
export interface IStockInfo extends IStock {
  city: string
}
