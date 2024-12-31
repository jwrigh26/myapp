import Typography from "@mui/material/Typography";
import PageLayout from "layouts/PageLayout";
// import { type Route } from "./+types/Home";

// export async function loader({ request, params }: Route.LoaderArgs) {
//   const foo = "loaderfoo";
//   await sleep(1000);
//   return { loaderFoo: foo };
// }

// export async function clientLoader() {
//   const foo = "foo";
//   await sleep(1000);
//   return { foo };
// }

export default function Home() {
  // export default function Home({ loaderData }: Route.ComponentProps) {
  // console.log("Home loaderData:", loaderData);
  return (
    <PageLayout>
      <Typography variant="h1">Home</Typography>
    </PageLayout>
  );
}
