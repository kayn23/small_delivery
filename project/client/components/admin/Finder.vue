<script lang="ts" setup>
import * as yup from 'yup'
import { Search } from '@element-plus/icons-vue'
const schema = yup.object({
  searchString: yup.string().required(),
})
const { fetch } = useCustomFetch()
const searchType = ref<'order' | 'user'>('order')
const searchLabel = computed(() => {
  if (searchType.value === 'order') return 'Поиск по номеру заказа'
  return 'Поиск по email пользователя'
})
async function send(params: { searchString: string }) {
  const path = '/api/admin/search' + (searchType.value === 'order' ? '/order' : '/user')
  fetch<{ id: string | number }>(path + '?id=' + params.searchString, {
    method: 'post',
  }).then(({ data }) => {
    navigateTo({
      path: '/account' + (searchType.value === 'order' ? '/invoices' : '/users') + `/${data.value?.id}`,
    })
  })
}
</script>
<template>
  <div>
    <ClientOnly>
      <vForm
        :validation-schema="schema"
        v-slot="{ handleSubmit }"
      >
        <form
          @submit="handleSubmit($event, send)"
          class="max-w-[500px]"
        >
          <div class="flex justify-start items-end mb-4">
            <vField
              name="searchString"
              v-slot="{ field, errors }"
            >
              <div class="form-field mr-2 mb-0">
                <label>
                  <p class="field-label">{{ searchLabel }}</p>
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
            <div class="form-item">
              <el-select
                v-model="searchType"
                class="block w-[150px]"
              >
                <el-option
                  value="user"
                  label="Пользователя по email"
                />

                <el-option
                  value="order"
                  label="Заказ"
                />
              </el-select>
            </div>
            <el-button
              type="primary"
              native-type="submit"
              size="large"
              class="mx-2"
            >
              <el-icon><Search /></el-icon>
              <span>Search</span>
            </el-button>
          </div>
        </form>
      </vForm>
    </ClientOnly>
  </div>
</template>
<style lang="sass">
.el-select__wrapper
  @apply py-3
</style>
