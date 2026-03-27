/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GA_TRACKING_ID: string
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  // Ajoutez d'autres variables d'environnement ici
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Déclaration globale pour les timers Node.js
declare global {
  namespace NodeJS {
    interface Timeout {}
  }
}