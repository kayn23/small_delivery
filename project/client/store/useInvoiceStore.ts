import { defineStore } from 'pinia'
import type { IInvoice, IInvoiceWithInfo, IStatus } from '~/types/invoice'
export default defineStore('invoice store', () => {
  const invoices = reactive<IInvoice[]>([])
  const { fetch } = useCustomFetch()

  async function getAll(filter?: string): Promise<IInvoice[]> {
    const res = await fetch<{ invoices: IInvoiceWithInfo[] }>('/invoices' + (filter ? `?${filter}` : ''))
    invoices.splice(0, invoices.length, ...res.invoices)
    return res.invoices
  }
  async function getInvoiceInfo(id: string | number): Promise<IInvoiceWithInfo> {
    const res = await fetch<{ invoice: IInvoiceWithInfo }>(`/invoices/${id}`)
    return res.invoice
  }
  async function getStatuses() {
    const res = await fetch<{ statuses: IStatus[] }>('/statuses')
    return res.statuses
  }
  async function createInvoice(invoice: IInvoice) {
    const res = await fetch<{ invoice_id: number }>(`/invoices`, {
      method: 'post',
      body: {
        invoice,
      },
    })
    return res.invoice_id
  }
  async function updateInvoice(invoice: IInvoice) {
    const res = await fetch<{ invoice_id: number }>(`/invoices/${invoice.id}`, {
      method: 'patch',
      body: {
        invoice,
      },
    })
    return res.invoice_id
  }

  return {
    invoices,
    getAll,
    getInvoiceInfo,
    getStatuses,
    createInvoice,
    updateInvoice,
  }
})
