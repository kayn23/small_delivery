<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  name: 'account home',
  middleware: ['is-login'],
})
const userStore = useUserStore()
const user = computed(() => userStore.currentUser)
</script>
<template>
  <admin-header-panel
    v-if="userStore.isAdmin"
    class="mb-4"
  />
  <account-invoice-list></account-invoice-list>
</template>
<style lang="sass"></style>
