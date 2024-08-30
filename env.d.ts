declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_BUCKET_NAME: string
    NEXT_PUBLIC_LOCAL_URL: string
    NEXT_PUBLIC_DEPLOY_URL: string
    NEXT_PUBLIC_SUPABASE_REFRENCE_ID: string
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    AUTH_SECRET: string
    AUTH_TRUST_HOST: string
  }
}
