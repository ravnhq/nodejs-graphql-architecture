declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: string
      DATABASE_URL: string
      JWT_SECRET: string
      JWT_EXP: string
      JWT_REFRESH_TOKEN_SECRET: string
      JWT_EXP_REFRESH: string
    }
  }
}

export {}
