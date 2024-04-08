<script lang="ts" setup>
import * as yup from 'yup'
import type { GenericObject } from 'vee-validate'
import type { IInvoice } from '~/types/invoice'
import type { IStockInfo } from '~/types/stock'
const userStore = useUserStore()
const stockStore = useStockStore()
const invoiceStore = useInvoiceStore()
definePageMeta({
  name: 'invoice new',
  layout: 'account',
  middleware: ['is-login'],
})
const schema = yup.object({
  sender: yup.number().required(),
  recipient: yup.number().required(),
  end_point: yup.number().required(),
  price: yup.number(),
})
const create = (value: GenericObject) => {}
const { data } = useAsyncData(() => {
  return stockStore.getAll()
})
</script>

<template>
  <div>
    <h1>new invoice</h1>
    <div>
      <vForm
        :validation-schema="schema"
        v-slot="{ handleSubmit }"
      >
        <form @submit="handleSubmit($event, create)">
          <vField
            name="sender"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">sender</p>
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
            name="end_point"
            v-slot="{ errors, value, handleChange, handleBlur }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Конечная точка</p>
                <el-select
                  @change="handleChange"
                  @blur="handleBlur"
                  :model-value="value"
                  filterable
                >
                  <el-option
                    v-for="item in data?.stocks || []"
                    :key="item.id"
                    :label="`${item.name}, ${item.city}, ${item.address}`"
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
            Войти
          </el-button>
        </form>
      </vForm>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
