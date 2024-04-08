<script lang="ts" setup>
import { UserType } from '~~/types/user'
import { ArrowRightBold } from '@element-plus/icons-vue'
definePageMeta({
  layout: 'account',
  name: 'invoice show',
  middleware: ['is-login'],
})
const route = useRoute()
const id = computed(() => route.params.id)
const invoiceStore = useInvoiceStore()
const { data: invoice } = useAsyncData(() => {
  return invoiceStore.getInvoiceInfo(id.value as string)
})
</script>
<template>
  <div>
    <h1>Invoice {{ id }}</h1>
    <div v-if="invoice">
      <account-invoice-status
        :status="invoice.status"
        class="mb-4"
      />
      <div class="flex tablet:block justify-between">
        <account-user-card
          v-if="invoice.sender_info"
          :user="invoice.sender_info"
          :user-type="UserType.sender"
          class="mb-4 w-1/2 tablet:w-full"
        />
        <div class="arrow">
          <el-icon><ArrowRightBold /></el-icon>
        </div>
        <account-user-card
          v-if="invoice.recipient_info"
          :user="invoice.recipient_info"
          :user-type="UserType.recipient"
          class="mb-4 w-1/2 tablet:w-full"
        />
      </div>
      <account-stock-card
        v-if="invoice.end_point_info"
        :stock="invoice.end_point_info"
      />
    </div>
  </div>
</template>
<style lang="sass">
.arrow *
  @apply font-bold text-3xl dark:text-nord-6 text-nord-1
</style>
