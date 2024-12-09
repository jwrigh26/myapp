import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  // return a list of pages to prerender
  // async prerender() {
  //   return [
  //     "/",
  //     "/about",
  //   ];
  // }
} satisfies Config;