<script lang="ts" setup>
import type { IInvoice } from '~/types/invoice'
import { FetchError } from 'ofetch'

definePageMeta({
  name: 'invoice new',
  layout: 'account',
  middleware: ['is-login'],
})
const invoiceStore = useInvoiceStore()
function onSubmit(invoice: IInvoice) {
  invoiceStore
    .createInvoice(invoice)
    .then((id) => {
      navigateTo({
        name: 'invoice show',
        params: {
          id,
        },
        replace: true,
      })
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
    <div>
      <account-invoice-form
        @submit="onSubmit"
        new
      />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
