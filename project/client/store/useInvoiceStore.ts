import { defineStore } from 'pinia'
import type { IInvoice, IInvoiceWithInfo } from '~/types/invoice'
export default defineStore('invoice store', () => {
  const invoices = reactive<IInvoice[]>([])
  const { fetch } = useCustomFetch()

  async function getAll(): Promise<IInvoiceWithInfo[]> {
    const res = await fetch<{ invoices: IInvoiceWithInfo[] }>('/invoices')
    invoices.splice(0, invoices.length, ...res.invoices)
    return res.invoices
  }
  async function getInvoiceInfo(id: string | number): Promise<IInvoiceWithInfo> {
    const res = await fetch<{ invoice: IInvoiceWithInfo }>(`/invoices/${id}`)
    return res.invoice
  }

  return {
    invoices,
    getAll,
    getInvoiceInfo,
  }
})
