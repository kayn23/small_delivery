<script setup lang="ts">
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'user list',
})
const userStore = useUserStore()
userStore.getAll()
function onFilterInput(str: string) {
  console.log(str)
  userStore.getAll(str)
}
</script>

<template>
  <div v-if="userStore.users">
    <NuxtLink
      :to="{ name: 'user new' }"
      class="el-button el-button--primary mb-4"
    >
      Создать клиента
    </NuxtLink>
    <account-user-filter
      class="mb-4"
      @input="onFilterInput"
    />
    <account-user-card
      class="mb-4"
      v-for="user in userStore.users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<style lang="sass" scoped></style>
