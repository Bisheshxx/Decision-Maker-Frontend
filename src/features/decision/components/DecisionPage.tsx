"use client";
import CardComponent from "@/shared/components/CardComponent";
import { CreateDecisionDialog } from "./CreateDecisionDialog";
import SearchInput from "@/shared/components/Search/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { DecisionService } from "../services/decision-services";
import { Decision } from "../types/decision.types";
import { useUrlState } from "@/shared/hooks/useUrlState";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/components/useDebounce";

export default function DecisionPage() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);
  const { urlState, setUrlState } = useUrlState({
    defaults: {
      page: 1,
      pageSize: 10,
      search: "",
    },
  });

  const { data: response } = useQuery({
    queryFn: () => DecisionService.getDecisions(urlState),
    queryKey: ["decisions", urlState.page, urlState.pageSize, urlState.search],
  });

  useEffect(() => {
    if (urlState.search !== debouncedSearch) {
      setUrlState({
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch, setUrlState, urlState.search]);

  return (
    <div className="container mx-auto">
      <h1 className="pt-12 leading-tight text-xl font-semibold">
        Decision Maker
      </h1>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between pt-8 items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <CreateDecisionDialog />
        </div>
        <CardComponentGrid decision={response?.data || []} />
      </div>
    </div>
  );
}

function CardComponentGrid({ decision }: { decision: Decision[] }) {
  return (
    <div className="grid grid-cols-4 gap-5">
      {decision?.map((d) => (
        <CardComponent data={d} key={d?.id} />
      ))}
    </div>
  );
}
