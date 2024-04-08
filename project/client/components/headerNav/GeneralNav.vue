<script lang="ts" setup>
const authStore = useAuthStore()
const userStore = useUserStore()
</script>
<template>
  <nav class="nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink :to="{ name: 'stock list' }">Склады</NuxtLink>
    <header-nav-login-user-nav v-if="authStore.isLogin" />
    <header-nav-not-auth-nav v-else />
    <header-nav-admin-nav v-if="userStore.isAdmin" />
  </nav>
</template>
<style lang="sass" scope>
.nav > *
  @apply mx-2
</style>
