import { Loader2 } from "lucide-react";
import React from "react";

interface IProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string;
  children: React.ReactElement | string;
  renderCondition?: boolean;
}
export function ApiStatusHandler({
  isLoading,
  isError,
  isSuccess,
  error,
  children,
  renderCondition,
  ...props
}: IProps & React.ComponentProps<"div">) {
  if (renderCondition) return null;
  if (isLoading)
    return (
      <div {...props}>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Loader2 className="animate-spin" size={40} />
          <span>Loading</span>
        </div>
      </div>
    );
  if (isError)
    return (
      <div {...props} role="alert">
        {error}
      </div>
    );
  if (isSuccess) return <div {...props}>{children}</div>;
  return null;
}
