import { defineStore } from 'pinia'
import type { ICity } from '~/types/city'
export default defineStore('city store', () => {
  const cities = reactive<ICity[]>([])
  const appconfig = useAppConfig()
  const { fetch } = useCustomFetch()
  async function getCities() {
    const res = await $fetch<{ cities: ICity[] }>(appconfig.host + '/cities')
    cities.splice(0, cities.length, ...res.cities)
    return res
  }
  async function createCity(city: ICity) {
    const res = await fetch<{ city_id: number }>('/cities', {
      method: 'post',
      body: {
        city,
      },
    })
    return res.city_id
  }
  async function updateCity(city: ICity) {
    if (!city.id) throw new Error('Not found city id')
    const res = await fetch<{ city_id: number }>('/cities/' + city.id, {
      method: 'post',
      body: {
        city,
      },
    })
    return res.city_id
  }
  async function deleteCity(id: string | number) {
    await fetch(`/cities/${id}`, {
      method: 'delete',
    })
    return true
  }
  return {
    cities,
    getCities,
    createCity,
    updateCity,
    deleteCity,
  }
})
