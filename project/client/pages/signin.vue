<script lang="ts" setup>
import * as yup from 'yup'
const authStore = useAuthStore()
const userStore = useUserStore()

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().min(6).required(),
})
const appConfig = useAppConfig()

function auth(params: { email: string; password: string }) {
  $fetch<{ token: string; user_id: string }>(appConfig.host + '/signin', {
    method: 'post',
    body: {
      ...params,
    },
  }).then((res) => {
    authStore.token = res.token
    userStore.getMe()
  })
}
</script>
<template>
  <div class="my-10 p-4 bg-nord-5 dark:bg-nord-3 bg-opacity-70 rounded-md mx-auto max-w-[440px]">
    <client-only>
      <h1 class="mb-4 text-3xl text-center">Войти</h1>
      <vForm
        :validation-schema="schema"
        v-slot="{ handleSubmit }"
      >
        <form @submit="handleSubmit($event, auth)">
          <vField
            name="email"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Email</p>
                <input
                  v-bind="field"
                  class="form-input"
                  autocomplete="none"
                />
                <el-popover
                  placement="top-start"
                  title="Validation error"
                  :width="200"
                  trigger="hover"
                  :content="errors.join(',')"
                  v-if="errors.length > 0"
                >
                  <template #reference>
                    <div class="error-target">!</div>
                  </template>
                </el-popover>
              </label>
            </div>
          </vField>
          <vField
            name="password"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Пароль</p>
                <input
                  v-bind="field"
                  class="form-input"
                  type="password"
                  autocomplete="none"
                />
                <el-popover
                  placement="top-start"
                  title="Validation error"
                  :width="200"
                  trigger="hover"
                  :content="errors.join(',')"
                  v-if="errors.length > 0"
                >
                  <template #reference>
                    <div class="error-target">!</div>
                  </template>
                </el-popover>
              </label>
            </div>
            <el-button
              size="large"
              type="primary"
              class="w-full"
              native-type="submit"
            >
              Войти
            </el-button>
          </vField>
        </form>
      </vForm>
    </client-only>
  </div>
</template>
<style lang="sass">
.form-field
  @apply mb-4
</style>
