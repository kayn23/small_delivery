<script setup lang="ts">
definePageMeta({
  layout: 'account',
  name: 'stock list',
})
const stockStore = useStockStore()

const { data } = useAsyncData(() => stockStore.getAll())
</script>

<template>
  <politic-admin class="mb-4">
    <NuxtLink
      :to="{ name: 'stock new' }"
      class="el-button el-button--primary"
      >Саздать новый склад</NuxtLink
    >
  </politic-admin>
  <div v-if="data">
    <account-stock-card
      v-for="stock in data"
      no-header
      :key="stock.id"
      :stock="stock"
      class="mb-4"
    />
  </div>
</template>

<style lang="sass" scoped></style>
