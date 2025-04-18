import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
    // Only enable to debug
    optimizeDeps: {
      // exclude: ["@mui/material", "@mdi/js"],
    },
    server: {
      hmr: true,
    },
    define: getDefineObject(env),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Ensure cross-platform compatibility
      },
    },
  };
});

/**
 * getDefineObject: Function that returns the define object for Vite
 *
 * In the .env file we expect variables to be prefixed with `VITE_REACT_APP_` in development
 * and `REACT_APP_` in production. This function transforms the environment variables to match
 * the format Vite expects.
 *
 * {
 *   'import.meta.env.VITE_REACT_APP_API_URL': '"https://example.com/api"',
 *   'import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY': '"pk_test_12345"'
 * }
 *
 * @param env - The env object from loadEnv
 * @returns The transformed define object for Vite
 * @example
 * import { defineConfig, loadEnv } from 'vite';
 * import { getDefineObject } from './config/env.config';
 * ...
 * define: getDefineObject(loadEnv(mode, process.cwd(), ''));
 */

type EnvObject = Record<string, string>;

function getDefineObject(env: EnvObject): Record<string, string> {
  if (!env) {
    return {};
  }

  const keys = [
    'FB_API_URL',
    'FB_AUTH_DOMAIN',
    'FB_PROJECT_ID',
    'FB_STORAGE_BUCKET',
    'FB_MESSAGING_SENDER_ID',
    'FB_APP_ID',
    'FB_MEASUREMENT_ID',
  ];

  // Determine the prefix based on the environment
  const prefix = 'VITE_REACT_APP_';

  // Source of environment variables (from .env or `process.env` depending on the environment)
  const source =  env;

  const define: Record<string, string | undefined> = {};

  // Map the keys to their prefixed values from the source
  keys.forEach((key) => {
    define[key] = source[`${prefix}${key}`];
  });

  const transformedDefine: Record<string, string> = {};

  // Map the keys to their values and transform to Vite format
  keys.forEach((key) => {
    const fullKey = `${prefix}${key}`;
    transformedDefine[`import.meta.env.${fullKey}`] = JSON.stringify(
      source[fullKey] || ''
    );
  });

  console.log('transformedDefine', transformedDefine);

  return transformedDefine;
}
