"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { twMerge } from "tailwind-merge";
import CustomDialog from "./CustomDialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import useUiState from "@/store/ui.store";

interface Actions {
  action: string;
  fn: (...args: any[]) => void;
  dialogContent: {
    title: string;
    description: string;
  };
  icon?: React.ReactElement;
  color?: string;
}
interface IProps {
  actions: Actions[];
  trigger: React.ReactElement;
  className?: string;
}

export default function CustomDropdown({
  actions,
  trigger,
  className,
}: IProps) {
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const { setOpenDialogName } = useUiState();
  const handleOnclick = (action: Actions) => {
    setSelectedAction(action);
    setOpenDialogName("action-confirmation");
  };

  const handleCancel = () => {
    // setSelectedAction(null);
    setOpenDialogName(null);
  };

  return (
    <>
      {selectedAction && (
        <ActionDialog action={selectedAction} handleCancel={handleCancel} />
      )}
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          align="end"
          className={twMerge("p-1 max-w-37.5", className)}
        >
          {actions.map((action, index) => (
            <div
              key={index}
              className={twMerge(
                "capitalize flex gap-2 text-sm justify-start items-center px-2 py-1 dark:hover:bg-white hover:bg-black dark:hover:text-black rounded-md",
                action?.color &&
                  `text-${action?.color}-500 hover:dark:text-${action?.color}-500`,
              )}
              onClick={() => handleOnclick(action)}
            >
              {action?.icon}
              {action?.action}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}

function ActionDialog({
  action,
  handleCancel,
}: {
  action: Actions;
  handleCancel: () => void;
}) {
  const handleAction = () => {
    action.fn();
    handleCancel();
  };
  return (
    <CustomDialog
      title={action?.dialogContent?.title}
      description={action?.dialogContent?.description}
      width="max-w-sm sm:max-w-sm"
      dialogName="action-confirmation"
    >
      <div className="flex justify-end gap-4">
        <Button onClick={handleAction}>Yes</Button>
        <Button onClick={handleCancel} variant={"destructive"}>
          No
        </Button>
      </div>
    </CustomDialog>
  );
}
