<script setup lang="ts">
interface IProps {
  title: string
  errors: string[]
}
const props = defineProps<IProps>()
</script>

<template>
  <div class="form-field">
    <label>
      <p class="form-label">{{ props.title || 'form field' }}</p>
    </label>
    <slot />
    <el-popover
      placement="top-start"
      title="Validation error"
      :width="200"
      trigger="hover"
      :content="props.errors.join(',')"
      v-if="props.errors.length > 0"
    >
      <template #reference>
        <div class="error-target">!</div>
      </template>
    </el-popover>
  </div>
</template>

<style lang="sass" scoped></style>
