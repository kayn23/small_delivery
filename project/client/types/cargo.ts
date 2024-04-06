export interface ICargo {
  id: number
  weight: number
  invoices_id: number
}

export interface ICargoWithQr extends ICargo {
  qr_code: string
}
