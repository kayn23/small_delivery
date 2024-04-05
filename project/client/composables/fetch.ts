import type { FetchError, FetchOptions } from 'ofetch'
import type {
  NitroFetchRequest,
  TypedInternalResponse,
  AvailableRouterMethod as _AvailableRouterMethod,
} from 'nitropack'
import type { AsyncData, FetchResult, UseFetchOptions } from '#app'
import useAuthStore from '~/store/useAuthStore'
type AvailableRouterMethod<R extends NitroFetchRequest> =
  | _AvailableRouterMethod<R>
  | Uppercase<_AvailableRouterMethod<R>>
type KeysOf<T> = Array<T extends T ? (keyof T extends string ? keyof T : never) : never>
type PickFrom<T, K extends Array<string>> =
  T extends Array<any>
    ? T
    : T extends Record<string, any>
      ? keyof T extends K[number]
        ? T
        : K[number] extends never
          ? T
          : Pick<T, K[number]>
      : T

interface fetchType {
  <
    ResT = void,
    ErrorT = FetchError,
    ReqT extends NitroFetchRequest = NitroFetchRequest,
    Method extends AvailableRouterMethod<ReqT> = ResT extends void
      ? 'get' extends AvailableRouterMethod<ReqT>
        ? 'get'
        : AvailableRouterMethod<ReqT>
      : AvailableRouterMethod<ReqT>,
    _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
    DataT = _ResT,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
    DefaultT = null,
  >(
    request: Ref<ReqT> | ReqT | (() => ReqT),
    opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>,
  ): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null>
}
export function useCustomFetch() {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()

  const headers = new Headers()
  headers.append('authorization', authStore.token || '')
  const fetch: fetchType = (url, options) => {
    return useFetch(runtimeConfig.host + url, { ...options, headers })
  }
  return {
    fetch,
  }
}
