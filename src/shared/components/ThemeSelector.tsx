import { Switch } from "@/components/ui/switch";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();
  return (
    <ThemeSwitch
      checked={theme === "dark"}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
    />
  );
}
