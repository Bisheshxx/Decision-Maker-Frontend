import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getNameInitials } from "../lib/hook-form-utils/index.util";

export function AvatarIcon({
  src,
  name,
  className,
}: {
  src?: string | null;
  name: string | undefined;
  className?: string;
}) {
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  return (
    <Avatar className={className}>
      <AvatarImage
        src={src ?? undefined}
        onLoadingStatusChange={(status) => {
          setIsAvatarLoading(status === "loading");
        }}
      />
      {isAvatarLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-muted">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : null}
      <AvatarFallback className="bg-primary text-white dark:text-black">
        {getNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
