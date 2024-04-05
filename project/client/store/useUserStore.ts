import type { IUser } from '~/types/user'

export default defineStore('user store', () => {
  const currentUser = ref<IUser | undefined>(undefined)
  const { fetch } = useCustomFetch()

  async function getMe() {
    const res = await fetch<{ user: IUser }>('/users')
    currentUser.value = res.data.value?.user
    return res.data.value?.user
  }
  async function showUser(id: number | string) {
    const res = await fetch<{ user: IUser }>(`/users/${id}`)
    return res.data.value?.user
  }
  async function createUser(user: IUser) {
    const res = await fetch<{ user_id: number }>('/users', {
      method: 'post',
      body: {
        ...user,
      },
    })
    return res.data.value?.user_id
  }
  async function updateUser(user: IUser) {
    const res = await fetch<{ user_id: number }>(`/users/${user.id}`, {
      method: 'patch',
      body: {
        ...user,
      },
    })
    return res.data.value?.user_id
  }
  async function deleteUser(id: number | string) {
    await fetch(`/users/${id}`, {
      method: 'delete',
    })
    return true
  }
  return {
    currentUser,
    getMe,
    showUser,
    createUser,
    updateUser,
    deleteUser,
  }
})
