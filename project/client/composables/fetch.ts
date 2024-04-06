import type { NitroFetchRequest, NitroFetchOptions, TypedInternalResponse, ExtractedRouteMethod } from 'nitropack'
import useAuthStore from '~~/store/useAuthStore'
import { FetchError } from 'ofetch'

export const useCustomFetch = () => {
  const authStore = useAuthStore()
  const appConfig = useAppConfig()

  const createHeader = () => {
    const headers = new Headers()
    headers.append('authorization', '' + (authStore.token || ''))
    headers.append('Content-type', 'application/json')
    return headers
  }
  const fetch = async <
    T = unknown,
    R extends NitroFetchRequest = NitroFetchRequest,
    O extends NitroFetchOptions<R> = NitroFetchOptions<R>,
  >(
    request: R,
    options?: O,
  ) => {
    const newOptions = Object.assign({}, options, {
      headers: createHeader(),
    })
    // const data = await $fetch.raw<T>(request, newOptions)
    const res = await $fetch<T>(appConfig.host + request, {
      ...newOptions,
    })
    // const token = data.headers.get('Authorization')
    // if (token) {
    //   authStore.updateAuthInfo({
    //     token,
    //   })
    // }
    // const res = await data.json()
    // console.log('***********')
    // console.log('res', data, res)
    return res
    // TODO добавить логгирование (rollbar, winston)
  }
  return {
    fetch,
  }
}
