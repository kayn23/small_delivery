<script lang="ts" setup>
import type { IInvoice } from '~/types/invoice'

interface IProps {
  invoice: IInvoice
}
const props = defineProps<IProps>()
const { invoice } = toRefs(props)
</script>
<template>
  <el-card>
    <template #header>
      <div>
        <h3>Id: {{ invoice.id }}</h3>
      </div>
    </template>
    <div>
      <div>
        <span v-if="invoice.price">Price: {{ invoice.price }}</span>
        <span v-else>Ожидается оплата</span>
      </div>
      <account-invoice-status :status="invoice.status" />
      <NuxtLink
        :to="{ name: 'invoice show', params: { id: invoice.id } }"
        class="el-button el-primary"
      >
        Подробнее
      </NuxtLink>
    </div>
  </el-card>
</template>
<style lang="sass"></style>
