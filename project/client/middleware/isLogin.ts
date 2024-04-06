export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  if (!authStore.isLogin) {
    return navigateTo({
      name: 'signin',
    })
  }
  userStore.getMe()
})
