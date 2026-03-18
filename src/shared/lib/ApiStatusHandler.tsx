import { Loader2, TriangleAlert } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: string;
  button: React.ReactElement;
  children: React.ReactElement | string;
}
export function ApiStatusHandler({
  isLoading,
  isError,
  isSuccess,
  error,
  children,
  button,
  ...props
}: IProps & React.ComponentProps<"div">) {
  const { className, ...restProps } = props;

  if (isLoading)
    return (
      <div
        {...restProps}
        className={twMerge("flex items-center justify-center", className)}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <Loader2 className="animate-spin" size={40} />
          <span>Loading</span>
        </div>
      </div>
    );
  if (isError)
    return (
      <div
        {...restProps}
        role="alert"
        className={twMerge("flex items-center justify-center", className)}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <TriangleAlert size={100} className="text-destructive" />
          <p className="text-xl font-extralight">
            {error || "An unexpected Error Occurred"}
          </p>
          {button}
        </div>
      </div>
    );
  if (isSuccess)
    return (
      <div {...restProps} className={className}>
        {children}
      </div>
    );
  return null;
}
