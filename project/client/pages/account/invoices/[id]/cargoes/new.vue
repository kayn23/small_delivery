<script setup lang="ts">
import type { ICargo } from '~/types/cargo'
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'invoice cargo new',
})

const cargoStock = useCargoStore()
const route = useRoute()
const id = computed(() => route.params.id as string)

function onApply(cargo: Omit<ICargo, 'invoice_id'>) {
  console.log('****')
  cargoStock
    .createCargo({
      ...cargo,
      invoice_id: id.value,
    })
    .then(() => {
      navigateTo({
        name: 'invoice show',
        params: {
          id: id.value,
        },
      })
    })
}
</script>

<template>
  <div>
    <p class="text-2xl mb-4">Прикрипить груз к заказу №{{ id }}</p>
    <account-cargo-form @change="onApply"></account-cargo-form>
  </div>
</template>

<style lang="sass" scoped></style>
