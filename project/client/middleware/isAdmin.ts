export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  if (!userStore.isAdmin) {
    return navigateTo({
      name: 'forbidden error',
      replace: true,
    })
  }
})
