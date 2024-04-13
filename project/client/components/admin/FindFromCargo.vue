<script setup lang="ts">
import type { FetchError } from 'ofetch'
const cargoStore = useCargoStore()
const input = ref<string>('')
function find() {
  cargoStore
    .getCargo(input.value)
    .then((res) => {
      navigateTo({
        name: 'invoice show',
        params: {
          id: res.invoice_id,
        },
      })
    })
    .catch((err: FetchError) => {
      ElMessage({
        message: `Ошибка ${err.statusCode}`,
        type: 'error',
        showClose: true,
      })
    })
}
</script>

<template>
  <form
    @submit.prevent="find"
    class="flex items-center justify-between"
  >
    <el-input
      v-model="input"
      placeholder="Идентификатор груза"
      class="mr-2"
      size="large"
    />
    <el-button
      type="primary"
      class="w-1/12"
      size="large"
      native-type="submit"
    >
      Искать
    </el-button>
  </form>
</template>

<style lang="sass" scoped></style>
