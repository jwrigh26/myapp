import { redirect } from "react-router";

export async function clientLoader() {
  return redirect("/foundations/getting-started");
}

export default function Foundations() {
  return null;
}

// Math is just the math I need to know to understand algorithms and data structures
