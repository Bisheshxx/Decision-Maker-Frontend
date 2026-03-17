import { Button } from "@/components/ui/button";
import CustomDialog from "@/shared/components/CustomDialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { SchemaCreateDecision } from "../Schema/create-decision.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useCallback } from "react";
import CreateDecisionForm from "../Forms/create-decision";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { DecisionService } from "../services/decision-services";

interface IProps {
  handleSubmitSuccess: () => void;
}

export function CreateDecisionDialog({ handleSubmitSuccess }: IProps) {
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
        <Button className="h-6 text-xs leading-tight min-w-1 px-1 py-1 sm:px-3">
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
