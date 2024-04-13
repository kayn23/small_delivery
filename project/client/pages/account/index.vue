<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  name: 'account home',
  middleware: ['is-login'],
})
</script>
<template>
  <politic-admin>
    <admin-find-from-cargo class="mb-4"></admin-find-from-cargo>
  </politic-admin>
  <account-invoice-list></account-invoice-list>
</template>
<style lang="sass"></style>
