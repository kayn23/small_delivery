<script setup lang="ts">
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'user list',
})
const userStore = useUserStore()
const { data } = useAsyncData(() => userStore.getAll())
</script>

<template>
  <div v-if="data">
    <account-user-card
      class="mb-4"
      v-for="user in data.users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<style lang="sass" scoped></style>
