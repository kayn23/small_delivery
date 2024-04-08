<script setup lang="ts">
import { UserRole } from '~/types/user'
interface IProps {
  role: UserRole
}
const props = defineProps<IProps>()
const { role } = toRefs(props)
const text = computed(() => {
  switch (role.value) {
    case UserRole.client:
      return 'Клиент'
    case UserRole.admin:
      return 'Менеджер'
  }
})
</script>

<template>{{ text }}</template>

<style lang="sass" scoped></style>
