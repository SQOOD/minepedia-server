declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    MINEPEDIA_APP_SECRET: string
    PORT?: string
  }
}
