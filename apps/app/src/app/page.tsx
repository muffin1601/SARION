import { redirect } from "next/navigation";
import { MARKETING_URL } from "@/config/urls";

export default function AppHome() {
  redirect(MARKETING_URL);
}

