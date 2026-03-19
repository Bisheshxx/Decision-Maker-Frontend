import DecisionDetailPage from "@/features/decision/components/DecisionDetailPage";
import { use } from "react";

export default function Page({ params }: PageProps<"/decision/[id]">) {
  const { id } = use(params);
  return <DecisionDetailPage id={id} />;
}
