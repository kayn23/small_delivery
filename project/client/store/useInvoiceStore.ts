import { defineStore } from 'pinia'
import type { IInvoice } from '~/types/invoice'
export default defineStore('invoice store', () => {
  const invoices = reactive<IInvoice[]>([])
  const { fetch } = useCustomFetch()

  async function getAll(): Promise<IInvoice[]> {
    const res = await fetch<{ invoices: IInvoice[] }>('/invoices')
    invoices.splice(0, invoices.length, ...res.invoices)
    return res.invoices
  }

  return {
    invoices,
    getAll,
  }
})
