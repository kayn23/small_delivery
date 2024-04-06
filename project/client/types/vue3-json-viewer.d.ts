declare module 'vue3-json-viewer' {
  import { AllowedComponentProps, App, Component, ComponentCustomProps, VNodeProps, Plugin } from 'vue'

  interface JsonViewerProps {
    value: Record<string, unknown> | Array<any> | string | number | boolean
    expanded: boolean
    expandDepth: number
    copyable: boolean | object
    sort: boolean
    boxed: boolean
    theme: string //"dark" | "light"
    previewMode: boolean
    timeformat: (value: any) => string
  }

  type JsonViewerType = JsonViewerProps & VNodeProps & AllowedComponentProps & ComponentCustomProps
  const JsonViewer: Component<JsonViewerType>
  export { JsonViewer }
  const def: Plugin
  export default def
}
