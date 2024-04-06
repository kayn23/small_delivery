<script lang="ts" setup>
import { MoonNight, Sunny } from '@element-plus/icons-vue'
const colorMode = useColorMode()
const mode = computed(() => {
  if (colorMode.preference === 'dark') return MoonNight
  return Sunny
})
</script>
<template>
  <ClientOnly>
    <el-switch
      v-model="$colorMode.preference"
      active-value="dark"
      :inactive-value="true"
      size="large"
      inline-prompt
      style="--el-switch-on-color: #434c5e; --el-switch-off-color: #4c566a"
      :active-icon="MoonNight"
      :inactive-icon="Sunny"
    >
    </el-switch>
  </ClientOnly>
</template>
<style lang="sass"></style>
