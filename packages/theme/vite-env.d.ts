/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot?: {
    accept: (path: string, callback: (mod: any) => void) => void
  }
}
