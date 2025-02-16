import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import react from '@vitejs/plugin-react-swc';
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
// Vite configuration
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      // react(),
      reactRouter(),
      tsconfigPaths(),
    ],
    optimizeDeps: {
      // exclude: ["@mui/material", "@mdi/js"],
    },
    // esbuild: false, // Using SWC for transpilation
    // swc: {
    //   jsxFactory: "React.createElement",
    //   jsxFragment: "React.Fragment",
    // },
    define: getDefineObject(env),
    server: {
      hmr: false, // Disable hot module replacement
    },
    // server: {
    //   hmr: true,
    //   historyApiFallback: true,
    //   port: 5173, // Default Vite port
    //   proxy: {
    //     "/.netlify/functions/": "http://localhost:9000",
    //   },
    // },
    // build: {
    //   emptyOutDir: true,
    //   sourcemap: true,
    //   minify: true,
    //   rollupOptions: {
    //     input: {
    //       main: "./index.html",
    //     },
    //     output: {
    //       dir: "build",
    //     },
    //   },
    //   target: "es2018",
    // },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Adding TypeScript extensions
      alias: {
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        data: path.resolve(__dirname, "src/data"),
        features: path.resolve(__dirname, "src/features"),
        hooks: path.resolve(__dirname, "src/hooks"),
        layouts: path.resolve(__dirname, "src/layouts"),
        lib: path.resolve(__dirname, "src/lib"),
        pages: path.resolve(__dirname, "src/pages"),
        providers: path.resolve(__dirname, "src/providers"),
        router: path.resolve(__dirname, "src/router"),
        services: path.resolve(__dirname, "src/services"),
        src: path.resolve(__dirname, "src"),
        styles: path.resolve(__dirname, "src/styles"),
        utils: path.resolve(__dirname, "src/utils"),
        React: path.resolve(__dirname, "node_modules/react/"),
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

  const keys = ["API_URL", "FAKE_API_TOKEN"];

  // Determine the prefix based on the environment
  const prefix =
    process.env.NODE_ENV === "production" ? "REACT_APP_" : "VITE_REACT_APP_";

  // Source of environment variables (from .env or `process.env` depending on the environment)
  const source = process.env.NODE_ENV === "production" ? process.env : env;

  const define: Record<string, string | undefined> = {};

  // Map the keys to their prefixed values from the source
  keys.forEach((key) => {
    define[key] = source[`${prefix}${key}`];
  });

  // Transform the `define` object to match the format Vite expects
  const transformedDefine: Record<string, string> = {};

  keys.forEach((key) => {
    transformedDefine[`import.meta.env.${prefix}${key}`] = JSON.stringify(
      define[key] || ""
    );
  });

  return transformedDefine;
}
