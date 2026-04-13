"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loading() {
  const [value, setValue] = useState(18);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((prev) => {
        // Slow down near completion to mimic real network progress.
        const increment = prev < 55 ? 12 : prev < 80 ? 5 : 2;
        return Math.min(prev + increment, 92);
      });
    }, 180);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-100">
      <Progress
        value={value}
        className="h-1.5 w-full rounded-none bg-primary/20"
      />
    </div>
  );
}
