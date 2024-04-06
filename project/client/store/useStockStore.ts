import { defineStore } from 'pinia'
import type { IStock, IStockInfo } from '~/types/stock'

export default defineStore('stock store', () => {
  const stocks = reactive<IStockInfo[]>([])
  const { fetch } = useCustomFetch()
  async function getAll() {
    const res = await $fetch<{ stocks: IStockInfo[] }>('/stocks')
    stocks.splice(0, stocks.length, ...res.stocks)
    return res
  }
  async function getStock(id: string | number) {
    const res = await $fetch<{ stock: IStockInfo }>('/stocks/' + id)
    return res
  }
  async function createStock(stock: IStock) {
    const res = await fetch<{ stock_id: number }>('/stocks', {
      method: 'post',
      body: {
        stock,
      },
    })
    return res.stock_id
  }
  async function updateStock(stock: IStock) {
    const res = await fetch<{ stock_id: number }>('/stocks', {
      method: 'patch',
      body: {
        stock,
      },
    })
    return res.stock_id
  }
  async function deleteStock(id: string | number) {
    await fetch(`/stocks/${id}`, { method: 'delete' })
    return true
  }
  return {
    stocks,
    getAll,
    getStock,
    createStock,
    updateStock,
    deleteStock,
  }
})