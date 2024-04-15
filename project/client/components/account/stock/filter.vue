<script setup lang="ts">
interface IEmits {
  (e: 'change', value: string): void
}
const emit = defineEmits<IEmits>()
const type = ref<'city' | 'name'>('city')
let timer: NodeJS.Timeout | undefined = undefined
function onInput(str: string) {
  let sql = ''
  switch (type.value) {
    case 'name':
      sql += `s.name_like=${str}`
      break
    case 'city':
      sql += `c.name_like=${str}`
  }
  if (str === '') return emit('change', '')
  if (!timer) emit('change', sql)
  if (str !== '')
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined
    }, 500)
}
const input = ref()
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
        label="Название"
        value="name"
      />
      <el-option
        label="Город"
        value="city"
      />
    </el-select>
  </div>
</template>

<style lang="sass" scoped></style>
