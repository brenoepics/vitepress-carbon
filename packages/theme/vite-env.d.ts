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

declare module 'markdown-it' {
  interface MarkdownItOptions {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    typographer?: boolean;
    quotes?: string;
    highlight?: (str: string, lang: string) => string;
  }

  class MarkdownIt {
    constructor(options?: MarkdownItOptions);
    render(md: string, env?: any): string;
    renderInline(md: string, env?: any): string;
  }

  export = MarkdownIt;
}
