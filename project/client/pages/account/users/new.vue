<script setup lang="ts">
definePageMeta({
  layout: 'account',
  name: 'user new',
  middleware: ['is-login', 'is-admin'],
})
import * as yup from 'yup'
import type { GenericObject } from 'vee-validate'
const userStore = useUserStore()
const schema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
})
async function create(values: GenericObject) {
  try {
    const id = await userStore.createUser({
      name: values.name,
      surname: values.surname,
      lastname: values.lastname,
      email: values.email,
    })
    navigateTo({ name: 'user show', params: { id } })
  } catch (err) {
    ElMessage((err as Error).message)
  }
}
</script>

<template>
  <div>
    <vForm
      :validation-schema="schema"
      v-slot="{ handleSubmit }"
    >
      <form @submit="handleSubmit($event, create)">
        <vField
          name="name"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Имя</p>
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
          name="surname"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Отчество</p>
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
          name="lastname"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Фамилия</p>
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
          name="email"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Email</p>
              <input
                type="email"
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

        <el-button
          size="large"
          type="primary"
          class="w-full"
          native-type="submit"
        >
          Создать
        </el-button>
      </form>
    </vForm>
  </div>
</template>

<style lang="sass" scoped></style>
