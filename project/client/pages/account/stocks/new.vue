<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
  name: 'stock new',
})
import * as yup from 'yup'
import type { GenericObject } from 'vee-validate'
import type { IStock } from '~/types/stock'
const stockStore = useStockStore()
const cityStore = useCityStore()

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  city_id: yup.number().required(),
})
async function create(values: GenericObject) {
  const stock: IStock = {
    name: values.name,
    address: values.address,
    city_id: values.city_id,
  }
  const id = await stockStore.createStock(stock)
  navigateTo({ name: 'stock show', params: { id } })
}
const { data } = useAsyncData(() => {
  return cityStore.getAll()
})
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
          Создать
        </el-button>
      </form>
    </vForm>
  </div>
</template>
<style lang="sass"></style>
