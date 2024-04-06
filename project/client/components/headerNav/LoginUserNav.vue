<script lang="ts" setup>
const userStore = useUserStore()
function signOut() {
  userStore.signOut().then(() => {
    navigateTo('/')
  })
}
</script>
<template>
  <NuxtLink to="/account">Аккаунт</NuxtLink>
  <a
    class="cursor-pointer"
    @click="signOut"
  >
    Выйти
  </a>
</template>
<style lang="sass"></style>
