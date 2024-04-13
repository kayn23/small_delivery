<script setup lang="ts">
import type { ICargo } from '~/types/cargo'

const cargoStock = useCargoStore()
function onApply(cargo: ICargo) {}
</script>

<template>
  <div>
    <account-cargo-form @apply="onApply"></account-cargo-form>
  </div>
</template>

<style lang="sass" scoped></style>
