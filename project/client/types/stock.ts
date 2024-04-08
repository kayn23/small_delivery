export interface IStock {
  id?: number
  name: string
  address: string
  city_id: number
}
export interface IStockInfo extends IStock {
  city: string
}
