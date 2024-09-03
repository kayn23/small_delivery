<script setup lang="ts">
definePageMeta({
  layout: 'account',
  name: 'user show',
  middleware: ['is-login', 'is-admin'],
})
const userStore = useUserStore()
const route = useRoute()
const id = computed(() => route.params.id as string)
const { data } = useAsyncData(() => userStore.showUser(id.value))
</script>

<template>
  <div v-if="data">
    <account-user-card
      :user="data"
      with-password
      hideMoreInfo
    />
  </div>
</template>

<style lang="sass" scoped></style>
