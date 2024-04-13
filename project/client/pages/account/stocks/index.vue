<script setup lang="ts">
import type { IStock } from '~/types/stock'

definePageMeta({
  layout: 'account',
  name: 'stock list',
})
const stockStore = useStockStore()

stockStore.getAll()
function onDelete(id: string | number) {
  stockStore.deleteStock(id).then(() => {
    stockStore.getAll()
  })
}
function onRestore(stock: IStock) {
  stockStore
    .updateStock({
      ...stock,
      deleted: false,
    })
    .then(() => {
      stockStore.getAll()
    })
}
</script>

<template>
  <politic-admin class="mb-4">
    <NuxtLink
      :to="{ name: 'stock new' }"
      class="el-button el-button--primary"
    >
      Саздать новый склад
    </NuxtLink>
  </politic-admin>
  <div v-if="stockStore.stocks.length > 0">
    <account-stock-card
      v-for="stock in stockStore.stocks"
      no-header
      :key="stock.id"
      :stock="stock"
      class="mb-4"
      @delete="onDelete"
      @restore="onRestore"
    />
  </div>
</template>

<style lang="sass" scoped></style>
