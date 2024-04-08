<script lang="ts" setup>
const invoiceStore = useInvoiceStore()
const { data } = useAsyncData(() => invoiceStore.getAll())
</script>
<template>
  <poliic-admin>
    <NuxtLink
      :to="{ name: 'invoice new' }"
      class="el-button el-button--primary mb-4"
    >
      Новый заказ
    </NuxtLink>
  </poliic-admin>
  <account-invoice-card
    v-for="inv in data || []"
    :key="inv.id"
    :invoice="inv"
    class="mb-4"
  />
</template>
<style lang="sass"></style>
