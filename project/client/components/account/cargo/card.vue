<script setup lang="ts">
import type { ICargo } from '~/types/cargo'

interface IProps {
  cargo: ICargo
  hideButton?: boolean
}
const props = defineProps<IProps>()
</script>

<template>
  <el-card>
    <p><span class="font-bold">Id груза: </span>{{ props.cargo.id }}</p>
    <p><span class="font-bold">Вес: </span>{{ props.cargo.weight }}</p>
    <NuxtLink
      :to="{ name: 'invoice show', params: { id: props.cargo.invoice_id } }"
      class="el-button"
      v-if="props.hideButton"
    >
      Перейти к заказу
    </NuxtLink>
  </el-card>
</template>

<style lang="sass" scoped></style>
