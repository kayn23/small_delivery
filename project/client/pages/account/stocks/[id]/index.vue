<script setup lang="ts">
import type { IStock } from '~/types/stock'

definePageMeta({
  layout: 'account',
  name: 'stock show',
})
const route = useRoute()
const id = computed(() => route.params.id as string)
const stockStore = useStockStore()
const { data } = useAsyncData(() => {
  return stockStore.getStock(id.value)
})
function onDelete(id: string | number) {
  stockStore.deleteStock(id).then(() => {
    if (process.client) window.location.reload()
  })
}
const stockref = ref<IStock | null>(null)
function onRestore(stock: IStock) {
  stockStore
    .updateStock({
      ...stock,
      deleted: false,
    })
    .then(() => {
      if (process.client) window.location.reload()
    })
}
</script>

<template>
  <div v-if="data">
    <account-stock-card
      :stock="data.stock"
      hide-info-link
      @delete="onDelete"
      @restore="onRestore"
    />
  </div>
</template>

<style lang="sass" scoped></style>
