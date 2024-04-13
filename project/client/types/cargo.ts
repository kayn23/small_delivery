export interface ICargo {
  id?: number | number
  weight: number
  invoice_id: number | string
}

export interface ICargoWithQr extends ICargo {
  qr_code: string
}
