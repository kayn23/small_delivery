<script lang="ts" setup>
import { InvoiceStatus, convertStatusToText } from '~/types/invoice'
interface IProps {
  status: InvoiceStatus
}
const props = defineProps<IProps>()
const { status } = toRefs(props)
const keys = computed(() => Object.values(InvoiceStatus).filter((value) => typeof value === 'number') as number[])
</script>
<template>
  <el-steps
    :active="status"
    finish-status="success"
  >
    <el-step
      v-for="st in keys"
      :key="st"
      :title="convertStatusToText(st)"
    ></el-step>
  </el-steps>
</template>
<style lang="sass"></style>
