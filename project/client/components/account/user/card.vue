<script lang="ts" setup>
import type { IUser } from '~/types/user'
import { UserType, UserRole } from '~/types/user'

interface IProps {
  user: IUser
  userType?: UserType | undefined
  withPassword?: boolean
}
const props = defineProps<IProps>()
const { user } = toRefs(props)
const userStore = useUserStore()
</script>
<template>
  <el-card>
    <template #header>
      <div class="flex items-end">
        <p
          v-if="props.userType !== undefined"
          class="mr-2 font-bold text-xl"
        >
          {{ props.userType === UserType.sender ? 'Отправитель' : 'Получатель' }}:
        </p>
        <p>{{ user.lastname }} {{ user.name }} {{ user.surname }}</p>
      </div>
    </template>
    <p><span class="font-bold">Email:</span> {{ user.email }}</p>
    <p v-if="userStore.isAdmin && user.role_id"><span>Роль:</span> <account-user-role :role="user.role_id" /></p>
    <p v-if="props.withPassword && props.user.role_id !== UserRole.admin"><span>Пароль: </span>{{ user.password }}</p>
    <NuxtLink
      :to="{ name: 'user show', params: { id: props.user.id } }"
      class="el-button"
      >Подробнее</NuxtLink
    >
    <NuxtLink
      :to="{ name: 'user edit', params: { id: props.user.id } }"
      class="el-button"
      >Редактировать</NuxtLink
    >
  </el-card>
</template>
<style lang="sass"></style>
