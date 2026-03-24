import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogEnum } from "@/store/types/DialogEnum";
import useUiState from "@/store/ui.store";

interface IProps {
  button?: React.ReactNode;
  width?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  dialogName: DialogEnum; //add dialog name in the enum as you create
}

export default function CustomDialog({
  button,
  width = "max-w-md",
  title,
  description,
  children,
  dialogName,
}: IProps) {
  const { openDialogName, setOpenDialogName } = useUiState();
  return (
    <Dialog
      open={dialogName === openDialogName}
      onOpenChange={(open) => setOpenDialogName(open ? dialogName : null)}
    >
      {button && <DialogTrigger asChild>{button}</DialogTrigger>}
      <DialogContent className={width}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
