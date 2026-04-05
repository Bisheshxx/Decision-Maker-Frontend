import { DASHBOARD_ROUTE } from "@/shared/constant/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(DASHBOARD_ROUTE);
}
