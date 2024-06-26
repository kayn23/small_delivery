export function useLocalStorage() {
  const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'false')
  }

  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    getFromLocalStorage,
    saveToLocalStorage,
  }
}
