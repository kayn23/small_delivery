<script setup lang="ts">
import type { IUser } from '~/types/user'
import * as yup from 'yup'
import type { GenericObject } from 'vee-validate'
import type { FormContext } from 'vee-validate'
import type { IRole } from '~/types/role'

interface IProps {
  user?: IUser
}
interface IEmits {
  (e: 'change', value: IUser): void
}
const props = defineProps<IProps>()
const { user: userProp } = toRefs(props)
const emit = defineEmits<IEmits>()
const schema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.number(),
})
function onApply(values: GenericObject) {
  emit('change', {
    name: values.name,
    surname: values.surname,
    lastname: values.lastname,
    email: values.email,
    role_id: values.role,
  })
}
const form = ref<{ resetForm: FormContext['resetForm'] } | null>(null)
onMounted(() => {
  if (userProp.value) {
    console.log(1)

    form.value?.resetForm({
      values: {
        name: userProp.value?.name,
        surname: userProp.value?.surname,
        lastname: userProp.value?.lastname,
        email: userProp.value?.email,
        role: userProp.value?.role_id?.toString(),
      },
    })
  } else
    form.value?.resetForm({
      values: {
        role: '1',
      },
    })
})
const { fetch } = useCustomFetch()
const { data } = useAsyncData(() => {
  return fetch<{ roles: IRole[] }>('/roles')
})
</script>

<template>
  <vForm
    :validation-schema="schema"
    v-slot="{ handleSubmit }"
    ref="form"
  >
    <form @submit="handleSubmit($event, onApply)">
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
      <VField
        name="role"
        v-slot="{ errors, value, handleChange, handleBlur }"
      >
        <util-form-field
          title="Роль пользователя"
          :errors="errors"
        >
          <el-select
            @change="handleChange"
            @blur="handleBlur"
            :model-value="value"
            filterable
          >
            <el-option
              v-for="item in data?.roles || []"
              :key="item.id"
              :label="`${item.name}`"
              :value="`${item.id}`"
            ></el-option>
          </el-select>
        </util-form-field>
      </VField>

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
</template>

<style lang="sass" scoped></style>
