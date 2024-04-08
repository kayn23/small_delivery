<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: ['is-login'],
  name: 'invoice list',
})
const invoiceStore = useInvoiceStore()
const { data } = useAsyncData(() => {
  return invoiceStore.getAll()
})
</script>
<template>
  <div>
    <h1>invoices</h1>

    <account-invoice-list></account-invoice-list>
  </div>
</template>
<style lang="sass"></style>
