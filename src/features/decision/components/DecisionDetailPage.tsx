"use client";

import { DecisionService } from "../services/decision-services";
import BorderLessInput from "@/shared/components/BorderLessInput";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { Decision, DecisionDetail } from "../types/decision.types";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { toast } from "sonner";
import { getDateRelativeNZ } from "@/shared/lib/date-utils/date.util";
import { Badge } from "@/components/ui/badge";
import DecisionSlotComponent from "./DecisionSlotComponent";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Trash } from "lucide-react";
import CustomDropdown from "@/shared/components/CustomDropdown";
import { useParams, useRouter } from "next/navigation";
import CustomDialog from "@/shared/components/CustomDialog";
import CreateDecisionItemForm from "../Forms/create-decision-item";

interface IProps {
  id: string;
}

const SLOWDOWN_SPEED = 4; // Seconds the spin lasts

export default function DecisionDetailPage({ id }: IProps) {
  const { data, isLoading, isError } = useApiQuery({
    queryFn: () => DecisionService.getDecisionDetails(id),
    queryKey: ["decision-detail", id],
  });

  //todo
  if (isLoading) return;
  if (isError) return;

  return (
    <div className="container mx-auto pt-2 px-1">
      <div className="flex justify-between">
        <TitleDescription data={data} />
        <div className="md:mt-2.5 flex flex-wrap gap-1 md:gap-2 justify-center item-end">
          <AddDecisionItem />
          <Dropdown data={data} />
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:w-auto w-full">
        <Badge>
          Created:
          {data?.createdAt ? getDateRelativeNZ(data.createdAt) : "n/a"}
        </Badge>
        <Badge>
          Last Updated:
          {data?.updatedAt ? getDateRelativeNZ(data.updatedAt) : "n/a"}
        </Badge>
      </div>
      {data && data?.decisionItems.length > 0 ? (
        <DecisionSlotComponent
          options={data?.decisionItems ?? []}
          visibleItems={17}
          speed={SLOWDOWN_SPEED}
        />
      ) : (
        <div className="h-[60vh] flex justify-center items-center border mt-4 rounded-md">
          <AddDecisionItem />
        </div>
      )}
    </div>
  );
}

function AddDecisionItem() {
  return (
    <CustomDialog
      button={
        <Button>
          <span className="hidden md:block">Add Options</span>
          <Plus className="" />
        </Button>
      }
      title={"Add Options"}
      description="This is where you add options"
      width="max-w-sm sm:max-w-sm"
      dialogName="create-decision-items"
    >
      <CreateDecisionItemForm />
    </CustomDialog>
  );
}

function TitleDescription({ data }: { data: DecisionDetail | undefined }) {
  const params = useParams<{ id: string }>();

  const updateDecision = useApiMutation(
    (data: Partial<Pick<Decision, "title" | "description">>) =>
      DecisionService.updateDecision(params.id, data),
    {
      onSuccess: (data) => console.log(data, "success"),
      onError: (error) => {
        if (error.response?.errorType === "Validation") {
          toast.error(error?.response?.message, {
            description: error?.response?.errors[0],
          });
        }
      },
      showToast: false,
      invalidateQueries: ["decision-detail", params.id],
    },
  );

  const mutateAction = async (key: string, updatedValue: string) => {
    if (key === "title" && updatedValue === "") return;
    const body = {
      title: data?.title,
      [key]: updatedValue,
    };
    await updateDecision.mutateAsync(body);
  };

  return (
    <div className="flex gap-3 flex-col">
      <BorderLessInput
        value={data?.title || "Untitled"}
        mutation={mutateAction}
        name="title"
        className="text-xl"
      />
      <BorderLessInput
        value={data?.description || "Untitled"}
        mutation={mutateAction}
        type="TextArea"
        name="description"
        placeholder="Add a description"
        className="md:text-sm md:w-96 text-[14px]"
      />
    </div>
  );
}

function Dropdown({ data }: { data: DecisionDetail | undefined }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const deleteDecision = useApiMutation(
    () => DecisionService.deleteDecision(params.id),
    {
      onSuccess: () => {
        router.push("/");
      },
    },
  );
  return (
    <CustomDropdown
      trigger={
        <Button variant={"ghost"}>
          <Settings />
        </Button>
      }
      actions={[
        {
          action: "delete",
          fn: async () => {
            await deleteDecision.mutateAsync(params.id);
          },
          dialogContent: {
            title: "Delete",
            description: `Are you sure you want to delete "${data?.title}"`,
          },
          icon: <Trash size={15} />,
          color: "red",
        },
      ]}
    />
  );
}
