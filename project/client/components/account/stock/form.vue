<script setup lang="ts">
import * as yup from 'yup'
import type { GenericObject } from 'vee-validate'
import type { IStock } from '~/types/stock'
import type { FormContext } from 'vee-validate'
const cityStore = useCityStore()
interface IProps {
  stock?: IStock
}
const props = defineProps<IProps>()
interface IEmits {
  (e: 'change', value: IStock): void
}
const emit = defineEmits<IEmits>()

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  city_id: yup.number().required(),
})
async function create(values: GenericObject) {
  emit('change', {
    name: values.name,
    address: values.address,
    city_id: values.city_id,
  })
}
const { data } = useAsyncData(() => {
  return cityStore.getAll()
})
const form = ref<{ resetForm: FormContext<IStock>['resetForm'] } | null>(null)
onMounted(() => {
  if (props.stock) {
    form.value?.resetForm({
      values: {
        name: props.stock.name,
        address: props.stock.address,
        city_id: props.stock.city_id,
      },
    })
  } else {
    form.value?.resetForm()
  }
})
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
          name="name"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Название</p>
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
          name="address"
          v-slot="{ field, errors }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Адрес</p>
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
        <VField
          name="city_id"
          v-slot="{ errors, value, handleChange, handleBlur }"
        >
          <div class="form-field">
            <label>
              <p class="field-label">Город</p>
              <el-select
                @change="handleChange"
                @blur="handleBlur"
                :model-value="value"
                filterable
              >
                <el-option
                  v-for="item in data?.cities || []"
                  :key="item.id"
                  :label="`${item.name}`"
                  :value="item.id"
                ></el-option>
              </el-select>
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
        </VField>

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
