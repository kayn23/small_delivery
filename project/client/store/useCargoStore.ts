import { defineStore } from 'pinia'
import type { ICargo, ICargoWithQr } from '~/types/cargo'
export default defineStore('cargo store', () => {
  const cargoes = reactive<ICargo[]>([])
  const { fetch } = useCustomFetch()
  async function getAll() {
    const res = await fetch<{ cargoes: ICargo[] }>('/cargoes')
    cargoes.splice(0, cargoes.length, ...res.cargoes)
    return res
  }
  async function getCargo(id: string | number) {
    const res = await fetch<{ cargo: ICargoWithQr }>(`/cargoes/${id}`)
    return res.cargo
  }
  async function createCargo(cargo: ICargo) {
    const res = await fetch<{ cargo_id: number }>('/cargoes', {
      method: 'post',
      body: {
        cargo,
      },
    })
    return res.cargo_id
  }
  async function updateCargo(cargo: ICargo) {
    if (!cargo.id) throw new Error("Cargo don't have id")
    const res = await fetch<{ cargo_id: number }>('/cargoes', {
      method: 'patch',
      body: {
        cargo,
      },
    })
    return res.cargo_id
  }
  async function deleteCargo(id: string | number) {
    await fetch(`/cargoes/${id}`, {
      method: 'delete',
    })
    return true
  }
  return {
    cargoes,
    getAll,
    getCargo,
    createCargo,
    updateCargo,
    deleteCargo,
  }
})
