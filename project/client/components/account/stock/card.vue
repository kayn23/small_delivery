<script lang="ts" setup>
import type { IStockInfo } from '~/types/stock'

// todo фильтр по городам
interface IProps {
  stock: IStockInfo
  noHeader?: boolean
}
const props = defineProps<IProps>()
const { stock, noHeader } = toRefs(props)
</script>
<template>
  <el-card>
    <h2
      class="text-2xl"
      v-if="!noHeader"
    >
      Точка получения
    </h2>
    <p><span class="font-bold">Название:</span> {{ stock.name }}</p>
    <p><span class="font-bold">Адрес:</span> {{ stock.address }}</p>
    <p><span class="font-bold">Город:</span> {{ stock.city }}</p>
  </el-card>
</template>
<style lang="sass"></style>
