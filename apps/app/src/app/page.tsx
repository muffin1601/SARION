import { redirect } from "next/navigation";

export default function AppHome() {
  // The protected dashboard middleware sends unauthenticated visitors to
  // /login and authenticated visitors to their CRM dashboard.
  redirect("/dashboard");
}

