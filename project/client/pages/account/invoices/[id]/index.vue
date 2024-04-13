<script lang="ts" setup>
import { UserType } from '~~/types/user'
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue'
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
    <h1 class="text-3xl mb-4">Заказ №{{ id }}</h1>
    <politic-admin class="mb-4">
      <NuxtLink
        :to="{ name: 'invoice edit', params: { id } }"
        class="el-button"
        >Изменить заказ</NuxtLink
      >
      <NuxtLink
        :to="{ name: 'invoice cargo new', params: { id } }"
        class="el-button el-button--primary"
        >Добавить груз</NuxtLink
      >
    </politic-admin>
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
        <div class="arrow flex items-center justify-center">
          <el-icon class="tablet:hidden"><ArrowRightBold /></el-icon>
          <el-icon class="hidden tablet:block mb-4"><ArrowDownBold /></el-icon>
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
        no-button
        class="mb-4"
      />
      <div v-if="invoice.cargoes && invoice.cargoes?.length > 0">
        <h3 class="mb-4 text-2xl">Грузы в заказе</h3>
        <account-cargo-card
          v-for="cargo in invoice.cargoes"
          :key="cargo.id"
          :cargo="cargo"
          no-button
          class="mb-4"
        />
      </div>
    </div>
  </div>
</template>
<style lang="sass">
.arrow *
  @apply font-bold text-3xl dark:text-nord-6 text-nord-1
</style>
