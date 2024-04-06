<script lang="ts" setup>
import type { IUser } from '~/types/user'
interface IProps {
  userInfo: IUser
}
const props = defineProps<IProps>()
const { userInfo } = toRefs(props)
</script>
<template>
  <div>{{ userInfo.name }} {{ userInfo.surname }} {{ userInfo.lastname }}</div>
</template>
<style lang="sass"></style>
