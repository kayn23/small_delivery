<script lang="ts" setup>
const invoiceStore = useInvoiceStore()
const { data } = useAsyncData(() => {
  return invoiceStore.getAll()
})
</script>
<template>
  <div>
    <h1>invoices</h1>
    <json-viewer
      :value="data || {}"
      :theme="$colorMode.preference"
    ></json-viewer>
  </div>
</template>
<style lang="sass"></style>
