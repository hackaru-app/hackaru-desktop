declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly HACKARU_WEB_AUTHORIZATION_ENDPOINT: string
    readonly HACKARU_API_TOKEN_ENDPOINT: string
    readonly HACKARU_API_CLIENT_ID: string
    readonly HACKARU_WEB_URL: string
    readonly GOOGLE_ANALYTICS_ID?: string
    readonly SENTRY_DSN?: string
  }
}
