import { type Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  // prerender: ["/about"],
  // prerender: ["/", "/about"],
  // return a list of pages to prerender
  // async prerender() {
  // let posts = await fakegetPosts();
  //   return ["/", "/blog"].concat(posts.map((p) => `/blog/${p.href}`));
  // },
} satisfies Config;
