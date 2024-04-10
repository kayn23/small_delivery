<script setup lang="ts">
interface IEmits {
  (e: 'onApply', value: string): void
}
const emit = defineEmits<IEmits>()
const input = ref<string>('')
function onApply() {
  emit('onApply', `${input.value}`)
}
</script>

<template>
  <div>
    <h3>Найти заказ</h3>
    <div class="flex items-center justify-between">
      <el-input
        class="mr-2"
        placeholder="id заказа"
        v-model="input"
        size="large"
      />
      <el-button
        size="large"
        @click="onApply"
        >Найти</el-button
      >
    </div>
  </div>
</template>

<style lang="sass" scoped></style>
