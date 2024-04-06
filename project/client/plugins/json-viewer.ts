import JsonViewer from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(JsonViewer)
})
