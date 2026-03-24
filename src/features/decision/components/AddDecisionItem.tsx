import CustomDialog from "@/shared/components/CustomDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateDecisionItemForm from "../Forms/create-decision-item";

export default function AddDecisionItem() {
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
