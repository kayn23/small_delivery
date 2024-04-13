<script setup lang="ts">
const userStore = useUserStore()
const user_id = computed(() => {
  return userStore.currentUser?.id
})
const type = ref<string[]>([])
interface IEvent {
  (e: 'onApply', value: string): void
}
const emit = defineEmits<IEvent>()
function onApply() {
  emit('onApply', type.value.join('&'))
}
</script>

<template>
  <div>
    <h3>Фильтровать заказы</h3>
    <div class="flex items-center justify-between">
      <el-select
        v-model="type"
        multiple
        collapse-tags
        class="mr-2"
      >
        <el-option
          v-if="!type.includes('status_noteq=6')"
          label="Выполненые"
          value="status_eq=6"
        />
        <el-option
          v-if="!type.includes('status_eq=6')"
          label="Не выполненые"
          value="status_noteq=6"
        />
        <el-option
          label="Ожидает получения"
          value="status_eq=5"
        />
        <el-option
          label="Ожидает оплаты"
          value="status_eq=2"
        />
        <el-option
          label="В процессе доставки"
          value="status_eq=3&status_eq=4"
        />
        <el-option
          label="Вы отправитель"
          :value="'sender_eq=' + user_id"
        />
        <el-option
          label="Вы получатель"
          :value="'recipient_eq=' + user_id"
        />
      </el-select>
      <el-button @click="onApply"> Применить </el-button>
    </div>
  </div>
</template>

<style lang="sass" scoped></style>
