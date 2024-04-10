<script lang="ts" setup>
import { FetchError } from 'ofetch'
const invoiceStore = useInvoiceStore()
useAsyncData(() => invoiceStore.getAll())
function onApplyFilter(value: string) {
  invoiceStore.getAll(value)
}
async function onApplyFinder(value: string) {
  await invoiceStore
    .getInvoiceInfo(value)
    .then((res) => {
      navigateTo({
        name: 'invoice show',
        params: {
          id: res.id,
        },
      })
    })
    .catch((err: FetchError) => {
      ElMessageBox({
        type: 'error',
        message: `Ошибка ${err.status} ${err.statusMessage}`,
      })
    })
}
</script>
<template>
  <politic-admin>
    <NuxtLink
      :to="{ name: 'invoice new' }"
      class="el-button el-button--primary mb-4"
    >
      Новый заказ
    </NuxtLink>
  </politic-admin>
  <account-invoice-find-by-id
    class="mb-4"
    @on-apply="onApplyFinder"
  />
  <account-invoice-filter
    class="mb-4"
    @on-apply="onApplyFilter"
  />
  <el-button
    class="mb-4"
    @click="() => invoiceStore.getAll()"
    >Показать все заказы</el-button
  >
  <div v-if="invoiceStore.invoices.length > 0">
    <account-invoice-card
      v-for="inv in invoiceStore.invoices"
      :key="inv.id"
      :invoice="inv"
      class="mb-4"
    />
  </div>
  <div v-else>Заказы не найдены</div>
</template>
<style lang="sass"></style>
