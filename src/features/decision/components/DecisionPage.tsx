"use client";
import CardComponent from "@/shared/components/CardComponent";
import { CreateDecisionDialog } from "./CreateDecisionDialog";
import SearchInput from "@/shared/components/Search/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { DecisionService } from "../services/decision-services";
import { Decision } from "../types/decision.types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import useDecisionUrlState from "../hooks/decision-url-state";
import useUiState from "@/store/ui.store";
import PaginationComponent from "@/shared/components/PaginationComponent";
import { ApiStatusHandler } from "@/shared/lib/ApiStatusHandler";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DecisionPage() {
  const router = useRouter();
  const { urlState, setUrlState, resetUrlState } = useDecisionUrlState();
  const { page, pageSize, searchTerm } = urlState;
  const [search, setSearch] = useState(searchTerm || "");
  const debouncedSearch = useDebounce(search);
  const { setOpenDialogName } = useUiState();

  const handlePageChange = useCallback(
    (page: number) =>
      setUrlState({
        page,
      }),
    [setUrlState],
  );

  const handleSubmitSuccess = useCallback(() => {
    setSearch("");
    setOpenDialogName(null);
    resetUrlState(["page"]);
  }, [resetUrlState, setOpenDialogName]);

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryFn: () => DecisionService.getDecisions(urlState),
    queryKey: ["decisions", page, pageSize, searchTerm],
    retry: false,
  });

  useEffect(() => {
    if (searchTerm !== debouncedSearch) {
      setUrlState({
        searchTerm: debouncedSearch,
        page: 1,
      });
    }
  }, [debouncedSearch, setUrlState, searchTerm]);

  console.log(error?.response);

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
        <ApiStatusHandler
          // className="min-h-[70vh] flex justify-center items-center"
          className="min-h-[70vh]"
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          error={error?.response?.message || error?.message}
          button={
            <Button variant={"destructive"} onClick={() => router.push("/")}>
              Back to Decision
            </Button>
          }
        >
          <CardComponentGrid decision={response?.data || []} />
        </ApiStatusHandler>
        {response?.meta && (
          <div className="w-full flex ">
            <PaginationComponent
              meta={response?.meta}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CardComponentGrid({ decision }: { decision: Decision[] }) {
  return (
    <div className="grid grid-cols-4 gap-5 w-full">
      {decision?.map((d) => (
        <CardComponent data={d} key={d?.id} />
      ))}
    </div>
  );
}
