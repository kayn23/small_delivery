<script setup lang="ts">
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
</script>

<template>
  <div><json-viewer :value="data || {}"></json-viewer></div>
</template>

<style lang="sass" scoped></style>
