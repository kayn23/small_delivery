<script setup lang="ts">
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'cargo show',
})
import type { ICargo } from '~/types/cargo'
import type { FetchError } from 'ofetch'

const cargoStore = useCargoStore()
const cargo = ref<ICargo | null>(null)
const route = useRoute()
const id = computed(() => route.params.cargo_id as string)
onBeforeMount(() => {
  cargoStore
    .getCargo(id.value)
    .then((res) => {
      cargo.value = res
    })
    .catch((err: FetchError) => {
      ElMessageBox({
        type: 'error',
        message: `Ошибка ${err.statusCode}`,
      }).then(() => {
        navigateTo('/account')
      })
    })
})
</script>

<template>
  <div v-if="cargo">
    <account-cargo-card :cargo="cargo" />
  </div>
</template>

<style lang="sass" scoped></style>
