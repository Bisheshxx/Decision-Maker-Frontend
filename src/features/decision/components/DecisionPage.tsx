"use client";
import CardComponent from "@/shared/components/CardComponent";
import SearchInput from "@/shared/components/Search/SearchInput";
import { DecisionService } from "../services/decision-services";
import { Decision } from "../types/decision.types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import useDecisionUrlState from "../hooks/decision-url-state";
import useUiState from "@/store/ui.store";
import PaginationComponent from "@/shared/components/PaginationComponent";
import { ApiStatusHandler } from "@/shared/lib/ApiStatusHandler";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { SchemaCreateDecision } from "../Schema/create-decision.schema";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { toServerFieldError } from "@/shared/lib/hook-form-utils/index.util";
import CreateDecisionForm from "../Forms/create-decision";
import CustomDialog from "@/shared/components/CustomDialog";
import { Plus } from "lucide-react";

export default function DecisionPage() {
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
    refetch,
    meta,
  } = useApiQuery({
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
          className="min-h-[70vh]"
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          error={error?.response?.message || error?.message}
          button={
            <Button variant={"destructive"} onClick={() => refetch()}>
              Refresh
            </Button>
          }
        >
          <CardComponentGrid decision={response || []} />
        </ApiStatusHandler>
        {meta && (
          <div className="w-full flex ">
            <PaginationComponent
              meta={meta}
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

function CreateDecisionDialog({
  handleSubmitSuccess,
}: {
  handleSubmitSuccess: () => void;
}) {
  // const handleCreate = async (data: z.infer<typeof SchemaCreateDecision>) => {};
  const form = useForm<z.infer<typeof SchemaCreateDecision>>({
    resolver: zodResolver(SchemaCreateDecision),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSuccess = () => {
    // setOpenDialogName(null);
    handleSubmitSuccess();
    form.reset();
    // resetUrlState(["page", "searchTerm"]);
  };

  const CreateDecision = useApiMutation(DecisionService.createDecision, {
    onSuccess: handleSuccess,
    invalidateQueries: ["decisions"],
    onError: (error) => {
      form.setError("title", toServerFieldError(error));
    },
  });

  const handleCreate = useCallback(
    async (data: z.infer<typeof SchemaCreateDecision>) => {
      await CreateDecision.mutateAsync(data);
    },
    [CreateDecision],
  );
  return (
    <CustomDialog
      button={
        <Button className="custom-button">
          <Plus />
          <span className="hidden md:block">New Decision</span>
        </Button>
      }
      title="Create a New Decision"
      description="Create a decision to help you choose between multiple options.Give it a clear title and description."
      width="max-w-sm sm:max-w-sm"
      dialogName="create-decision"
    >
      <CreateDecisionForm form={form} handleCreate={handleCreate} />
    </CustomDialog>
  );
}
