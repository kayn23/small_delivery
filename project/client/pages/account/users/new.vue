<script setup lang="ts">
definePageMeta({
  layout: 'account',
  name: 'user new',
  middleware: ['is-login', 'is-admin'],
})
import type { IUser } from '~/types/user'
import type { FetchError } from 'ofetch'
const userStore = useUserStore()
function create(user: IUser) {
  userStore
    .createUser(user)
    .then((id) => {
      navigateTo({ name: 'user show', params: { id } })
    })
    .catch((err: FetchError) => {
      ElMessageBox({
        type: 'error',
        message: `Ошибка ${err.statusCode}`,
      })
    })
}
</script>

<template>
  <div>
    <account-user-form @change="create" />
  </div>
</template>

<style lang="sass" scoped></style>
