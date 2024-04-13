<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import type { GenericObject } from 'vee-validate'
import * as yp from 'yup'
import type { ICargo } from '~/types/cargo'

interface IProps {
  cargo?: ICargo
}
interface IEmits {
  (e: 'change', value: Omit<ICargo, 'invoice_id'>): void
}
const emit = defineEmits<IEmits>()
const props = defineProps<IProps>()
const schema = yp.object({
  weight: yp.number().required(),
})

const form = ref<{ resetForm: FormContext<ICargo>['resetForm'] } | null>(null)
onMounted(() => {
  if (props.cargo) {
    form.value?.resetForm({
      values: {
        weight: props.cargo.weight,
      },
    })
  } else {
    form.value?.resetForm()
  }
})
function create(value: GenericObject) {
  emit('change', {
    weight: value.weight,
  })
}
</script>

<template>
  <div>
    <vForm
      :validation-schema="schema"
      v-slot="{ handleSubmit }"
      ref="form"
    >
      <form @submit="handleSubmit($event, create)">
        <vField
          name="weight"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Вес груза</p>
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
        <el-button
          size="large"
          type="primary"
          class="w-full"
          native-type="submit"
        >
          Сохранить
        </el-button>
      </form>
    </vForm>
  </div>
</template>

<style lang="sass" scoped></style>
