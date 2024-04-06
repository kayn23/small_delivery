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
  <admin-header-panel></admin-header-panel>
  <user-info-preview
    :user-info="user"
    v-if="user"
  />
</template>
<style lang="sass"></style>
