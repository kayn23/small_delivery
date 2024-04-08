<script setup lang="ts">
const userStore = useUserStore()
const isAdmin = computed(() => userStore.isAdmin)
</script>

<template>
  <div v-if="isAdmin"><slot /></div>
</template>

<style lang="sass" scoped></style>
