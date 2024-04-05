import { defineStore } from 'pinia'
export default defineStore(
  'authStore',
  () => {
    const token = ref<string | undefined>()
    const isLogin = computed(() => !!token.value)
    function createHeader() {
      if (!token.value) throw new Error('Not found token')
      const headers = new Headers()
      headers.append('authorization', token.value)
      return headers
    }
    function signOut() {
      return new Promise((resolve) => {
        token.value = undefined
        resolve(true)
      })
    }
    return {
      token,
      isLogin,
      signOut,
      createHeader,
    }
  },
  { persist: true },
)
