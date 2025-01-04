import Typography from "@mui/material/Typography";
import PageLayout from "layouts/PageLayout";
import { redirect } from "react-router";

export async function clientLoader() {
  return redirect("/foundations/getting-started");
}

export default function Foundations() {
  return (
    <PageLayout>
      <Typography variant="h1">Foundations Getting Started</Typography>
    </PageLayout>
  );
}

// Math is just the math I need to know to understand algorithms and data structures
