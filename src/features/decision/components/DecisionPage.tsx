"use client";
import CardComponent from "@/shared/components/CardComponent";
import { CreateDecisionDialog } from "./CreateDecisionDialog";
import SearchInput from "@/shared/components/Search/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { DecisionService } from "../services/decision-services";
import { Decision } from "../types/decision.types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/shared/components/useDebounce";
import useDecisionUrlState from "../hooks/decision-url-state";
import useUiState from "@/store/ui.store";

export default function DecisionPage() {
  const { urlState, setUrlState, resetUrlState } = useDecisionUrlState();
  const [search, setSearch] = useState(urlState.searchTerm || "");

  const debouncedSearch = useDebounce(search);
  const { setOpenDialogName } = useUiState();

  const handleSubmitSuccess = useCallback(() => {
    setSearch("");
    setOpenDialogName(null);
    resetUrlState(["page"]);
  }, [resetUrlState, setOpenDialogName]);

  const { data: response } = useQuery({
    queryFn: () => DecisionService.getDecisions(urlState),
    queryKey: [
      "decisions",
      urlState.page,
      urlState.pageSize,
      urlState.searchTerm,
    ],
  });

  useEffect(() => {
    if (urlState.searchTerm !== debouncedSearch) {
      setUrlState({
        searchTerm: debouncedSearch,
        page: 1,
      });
    }
  }, [debouncedSearch, setUrlState, urlState.searchTerm]);

  return (
    <div className="container mx-auto">
      <h1 className="pt-12 leading-tight text-xl font-semibold">
        Decision Maker
      </h1>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between pt-8 items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <CreateDecisionDialog handleSubmitSuccess={handleSubmitSuccess} />
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
