<script lang="ts" setup></script>
<template>
  <div class="main-container-height">
    <main-header class="fixed left-0 right-0 top-0 z-50" />
    <main class="mt-20 tablet:px-2 text-justify">
      <div class="bg-nord-11">Error</div>
      <slot />
    </main>
    <!-- <TheFooter :class="theme"  /> -->
    <el-backtop
      :right="50"
      :bottom="50"
    />
    <main-footer></main-footer>
  </div>
</template>
<style lang="sass"></style>
