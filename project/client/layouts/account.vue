<script lang="ts" setup>
const userStore = useUserStore()
const route = useRoute()
function getPath(id: number) {
  const item = route.path.split('/')
  return { path: item.filter((_, index) => index <= id).join('/') }
}
// userStore.getUserInfo().then((res) => {
//   console.log(res)
// })
</script>
<template>
  <div class="main-container-height">
    <main-header class="fixed left-0 right-0 top-0 z-50" />
    <main class="mt-24 tablet:px-2 px-4 text-justify">
      <el-breadcrumb
        separator="/"
        class="mb-4"
      >
        <el-breadcrumb-item
          v-for="(item, index) in route.path.split('/')"
          :key="item + index"
          :to="getPath(index)"
          >{{ item }}</el-breadcrumb-item
        >
      </el-breadcrumb>
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
