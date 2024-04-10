<script setup lang="ts">
import * as yup from 'yup'
import type { FormContext } from 'vee-validate'
import type { GenericObject } from 'vee-validate'
import type { IUser } from '~/types/user'
import type { IInvoice } from '~/types/invoice'

interface IEvent {
  (e: 'submit', value: IInvoice): void
}
const emit = defineEmits<IEvent>()
interface IProps {
  invoice?: IInvoice
  new?: boolean
}
const props = defineProps<IProps>()

const stockStore = useStockStore()
const userStore = useUserStore()
const invoiceStore = useInvoiceStore()

const schema = yup.object({
  sender: yup.number().required(),
  recipient: yup.number().required(),
  end_point: yup.number().required(),
  price: yup.number(),
  status: yup.number(),
})
const { data } = useAsyncData(async () => {
  const [stocks, users, statuses] = await Promise.all([
    stockStore.getAll(),
    userStore.getAll(),
    invoiceStore.getStatuses(),
  ])
  return { stocks, users, statuses }
})
const form = ref<{ resetForm: FormContext['resetForm'] } | null>(null)
onMounted(() => {
  if (props.invoice) {
    form.value?.resetForm({
      values: {
        sender: props.invoice.sender.toString(),
        recipient: props.invoice.recipient.toString(),
        end_point: props.invoice.end_point.toString(),
        price: props.invoice.price?.toString(),
        status: props.invoice.status.toString(),
      },
    })
  } else form.value?.resetForm()
})

function create(value: GenericObject) {
  emit('submit', {
    sender: value.sender,
    recipient: value.recipient,
    price: value?.price ?? 0,
    end_point: value.end_point,
    status: value?.status ?? 1,
  })
}

const hideStatus = computed(() => !props.new)
</script>

<template>
  <vForm
    :validation-schema="schema"
    v-slot="{ handleSubmit }"
    ref="form"
  >
    <form @submit="handleSubmit($event, create)">
      <VField
        name="sender"
        v-slot="{ errors, value, handleChange, handleBlur }"
      >
        <util-form-field
          title="Отправитель"
          :errors="errors"
        >
          <el-select
            @change="handleChange"
            @blur="handleBlur"
            :model-value="value"
            filterable
          >
            <el-option
              v-for="item in data?.users.users || []"
              :key="item.id"
              :label="`${item.id}, ${item.lastname} ${item.name} ${item.surname}, ${item.email}`"
              :value="`${item.id}`"
            ></el-option>
          </el-select>
        </util-form-field>
      </VField>
      <VField
        name="recipient"
        v-slot="{ errors, value, handleChange, handleBlur }"
      >
        <util-form-field
          title="Получатель"
          :errors="errors"
        >
          <el-select
            @change="handleChange"
            @blur="handleBlur"
            :model-value="value"
            filterable
          >
            <el-option
              v-for="item in data?.users.users || []"
              :key="item.id"
              :label="`${item.id}, ${item.lastname} ${item.name} ${item.surname}, ${item.email}`"
              :value="`${item.id}`"
            ></el-option>
          </el-select>
        </util-form-field>
      </VField>

      <VField
        name="end_point"
        v-slot="{ errors, value, handleChange, handleBlur }"
      >
        <util-form-field
          title="Конечная точка"
          :errors="errors"
        >
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
              :value="`${item.id}`"
            ></el-option>
          </el-select>
        </util-form-field>
      </VField>
      <VField
        name="price"
        v-slot="{ value, errors, handleInput, handleBlur }"
      >
        <util-form-field
          title="Цена"
          :errors="errors"
        >
          <el-input
            :model-value="value"
            @input="handleInput"
            @blur="handleBlur"
            placeholder="Цена"
            size="large"
          />
        </util-form-field>
      </VField>
      <VField
        name="status"
        v-if="hideStatus"
        v-slot="{ value, errors, handleChange, handleBlur }"
      >
        <util-form-field
          title="Статус заказа"
          :errors="errors"
        >
          <el-select
            @change="handleChange"
            @blur="handleBlur"
            :model-value="value"
            filterable
          >
            <el-option
              v-for="item in data?.statuses || []"
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
        Сохранить
      </el-button>
    </form>
  </vForm>
</template>

<style lang="sass" scoped></style>
