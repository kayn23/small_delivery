<script setup lang="ts">
import type { IUser } from '~/types/user'
import type { FetchError } from 'ofetch'

definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'user edit',
})
const userStore = useUserStore()
const route = useRoute()
const id = computed(() => route.params.id as string)
const { data } = useAsyncData(() => userStore.showUser(id.value))
function onUpdate(user: IUser) {
  userStore
    .updateUser({
      ...user,
      id: id.value,
    })
    .then((id) => {
      navigateTo({
        name: 'user show',
        params: {
          id,
        },
      })
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
  <div v-if="data">
    <account-user-form
      :user="data"
      @change="onUpdate"
    />
  </div>
</template>

<style lang="sass" scoped></style>
