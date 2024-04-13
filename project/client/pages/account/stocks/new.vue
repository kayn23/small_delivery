<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'stock new',
})
import type { IStock } from '~/types/stock'
import type { FetchError } from 'ofetch'
const stockStore = useStockStore()

async function create(stock: IStock) {
  stockStore
    .createStock(stock)
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
</script>
<template>
  <div>
    <account-stock-form @change="create" />
  </div>
</template>
<style lang="sass"></style>
