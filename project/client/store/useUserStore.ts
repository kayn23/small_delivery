import { UserRole, type IUser } from '~/types/user'

export const useUserStore = defineStore(
  'user store',
  () => {
    const authStore = useAuthStore()
    const { fetch } = useCustomFetch()
    const currentUser = ref<IUser | undefined>(undefined)
    const users = reactive<IUser[]>([])
    let timer: NodeJS.Timeout | undefined = undefined
    const isAdmin = computed(() => {
      if (currentUser) return currentUser.value?.role_id === UserRole.admin
      return false
    })

    async function getMe() {
      if (timer) return currentUser.value
      const res = await fetch<{ user: IUser }>('/users')
      currentUser.value = res.user
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = undefined
      }, 2000)
      return res.user
    }
    async function getAll(filters?: string) {
      const res = await fetch<{ users: IUser[] }>('/users_all' + (!!filters ? `?${filters}` : ''))
      users.splice(0, users.length, ...res.users)
      return res
    }
    async function showUser(id: number | string) {
      const res = await fetch<{ user: IUser }>(`/users/${id}`)
      return res.user
    }
    async function createUser(user: IUser) {
      const res = await fetch<{ user_id: number }>('/users', {
        method: 'post',
        body: {
          user,
        },
      })
      return res.user_id
    }
    async function updateUser(user: IUser) {
      const res = await fetch<{ user_id: number }>(`/users/${user.id}`, {
        method: 'patch',
        body: {
          user,
        },
      })
      return res.user_id
    }
    async function deleteUser(id: number | string) {
      await fetch(`/users/${id}`, {
        method: 'delete',
      })
      return true
    }
    async function signOut() {
      currentUser.value = undefined
      await authStore.signOut()
    }
    return {
      users,
      currentUser,
      getMe,
      showUser,
      createUser,
      updateUser,
      deleteUser,
      isAdmin,
      signOut,
      getAll,
    }
  },
  {
    persist: true,
  }
)
export default useUserStore
