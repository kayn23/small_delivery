<script setup lang="ts">
interface IEmits {
  (e: 'input', value: string): void
}
const emit = defineEmits<IEmits>()
const input = ref('')
const type = ref<'id' | 'fio' | 'email'>('id')
let timer: NodeJS.Timeout | undefined = undefined
function onInput(str: string) {
  let sql = ''
  switch (type.value) {
    case 'id':
      sql += `id_eq=${str}`
      break
    case 'fio':
      sql += `name_like=${str}&surname_like=${str}&lastname_like=${str}`
      break
    case 'email':
      sql += `email_like=${str}`
  }
  if (str === '') return emit('input', '')
  if (!timer) emit('input', sql)
  if (str !== '')
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined
    }, 500)
}
</script>

<template>
  <div class="flex justify-between items-center tablet:block">
    <el-input
      v-model="input"
      @input="onInput"
      placeholder="Строка поиска"
      class="w-4/5 tablet:w-full tablet:mb-4"
    />
    <el-select
      class="w-1/6 tablet:w-full tablet:mb-4"
      v-model="type"
    >
      <el-option
        label="email"
        value="email"
      />
      <el-option
        label="ФИО"
        value="fio"
      />
      <el-option
        label="id"
        value="id"
      />
    </el-select>
  </div>
</template>

<style lang="sass" scoped></style>
