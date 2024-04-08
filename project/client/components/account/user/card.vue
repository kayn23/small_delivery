<script lang="ts" setup>
import type { IUser } from '~/types/user'
import { UserType } from '~/types/user'

interface IProps {
  user: IUser
  userType?: UserType | undefined
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
  </el-card>
</template>
<style lang="sass"></style>
