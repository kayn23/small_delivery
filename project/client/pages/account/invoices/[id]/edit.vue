<script lang="ts" setup>
import type { IInvoice } from '~/types/invoice'
import { FetchError } from 'ofetch'

definePageMeta({
  name: 'invoice edit',
  layout: 'account',
  middleware: ['is-login'],
})
const route = useRoute()
const id = computed(() => route.params.id as string)
const invoiceStore = useInvoiceStore()
const { data } = useAsyncData(() => invoiceStore.getInvoiceInfo(id.value))
function onSubmit(invoice: IInvoice) {
  invoiceStore
    .updateInvoice({
      ...invoice,
      id: id.value,
    })
    .then((id) => {
      navigateTo({ name: 'invoice show', params: { id }, replace: true })
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
    <h1>new invoice</h1>
    <div
      v-if="data"
      class="mb-4"
    >
      <account-invoice-form
        @submit="onSubmit"
        :invoice="data"
      />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
