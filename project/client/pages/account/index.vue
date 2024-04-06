<script lang="ts" setup>
const userStore = useUserStore()
const user = computed(() => userStore.currentUser)
</script>
<template>
  <user-info-preview :user-info="user" />
</template>
<style lang="sass"></style>
