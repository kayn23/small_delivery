<script setup lang="ts">
import type { IStock } from '~/types/stock'
import type { FetchError } from 'ofetch'

definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'stock edit',
})
const route = useRoute()
const id = computed(() => route.params.id as string)
const stockStore = useStockStore()
function update(stock: IStock) {
  stockStore
    .updateStock({
      ...stock,
      id: id.value,
    })
    .then((id) => {
      navigateTo({ name: 'stock show', params: { id } })
    })
    .catch((err: FetchError) => {
      ElMessageBox({
        type: 'error',
        message: `Ошибка ${err.statusCode}`,
      })
    })
}
const { data } = useAsyncData(() => stockStore.getStock(id.value))
</script>

<template>
  <div v-if="data">
    <account-stock-form
      :stock="data.stock"
      @change="update"
    />
  </div>
</template>

<style lang="sass" scoped></style>
