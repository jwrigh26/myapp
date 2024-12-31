import Typography from "@mui/material/Typography";
import PageLayout from "layouts/PageLayout";
import { Suspense } from "react";
import { Await } from "react-router";
import { type Route } from "./+types/About";

export async function clientLoader({ request, params }: Route.LoaderArgs) {
  const foo = new Promise((res) => {
    setTimeout(() => res("non-crti"), 1000);
  });
  return { foo };
}

function About({ loaderData }: Route.ComponentProps) {
  const { foo } = loaderData;
  return (
    <PageLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={foo}>
          {() => <Typography variant="h1">About Page</Typography>}
        </Await>
      </Suspense>
    </PageLayout>
  );
}

export default About;
