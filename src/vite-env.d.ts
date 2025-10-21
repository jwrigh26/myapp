/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_FB_API_URL: string;
  readonly VITE_REACT_APP_FB_AUTH_DOMAIN: string;
  readonly VITE_REACT_APP_FB_PROJECT_ID: string;
  readonly VITE_REACT_APP_FB_STORAGE_BUCKET: string;
  readonly VITE_REACT_APP_FB_MESSAGING_SENDER_ID: string;
  readonly VITE_REACT_APP_FB_APP_ID: string;
  readonly VITE_REACT_APP_FB_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
