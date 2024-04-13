<script lang="ts" setup>
import type { IStock, IStockInfo } from '~/types/stock'
import { DeleteFilled } from '@element-plus/icons-vue'

// todo фильтр по городам
interface IProps {
  stock: IStockInfo
  noHeader?: boolean
  noButton?: boolean
  hideInfoLink?: boolean
}
const props = defineProps<IProps>()
interface IEmits {
  (e: 'delete', value: string | number): void
  (e: 'restore', value: IStock): void
}
const emit = defineEmits<IEmits>()

const { stock, noHeader } = toRefs(props)
function onDelete(id: number | string | undefined) {
  if (id) emit('delete', id)
}
function onRestore(stock: IStock) {
  emit('restore', stock)
}
</script>
<template>
  <el-card class="relative">
    <h2
      class="text-2xl"
      v-if="!noHeader"
    >
      Точка получения
    </h2>
    <div
      v-if="stock.deleted"
      class="absolute top-2 right-2 text-nord-11 border border-nord-13 p-2 rounded-full w-10 h-10 flew items-center justify-center text-center"
    >
      <el-icon><DeleteFilled /></el-icon>
    </div>
    <p><span class="font-bold">Название:</span> {{ stock.name }}</p>
    <p><span class="font-bold">Адрес:</span> {{ stock.address }}</p>
    <p><span class="font-bold">Город:</span> {{ stock.city }}</p>
    <politic-admin>
      <NuxtLink
        :to="{ name: 'stock show', params: { id: stock.id } }"
        class="el-button"
        v-if="!props.hideInfoLink"
      >
        Подробнее
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'stock edit', params: { id: stock.id } }"
        class="el-button"
        v-if="!props.noButton"
        >Редактировать</NuxtLink
      >
      <el-button
        type="danger"
        @click="() => onDelete(stock.id)"
        v-if="!props.noButton && !props.stock.deleted"
      >
        Закрыть пункт
      </el-button>
      <el-button
        v-if="props.stock.deleted && !props.noButton"
        type="danger"
        @click="() => onRestore(stock)"
      >
        Вернуть в экспулатацию
      </el-button>
    </politic-admin>
  </el-card>
</template>
<style lang="sass"></style>
