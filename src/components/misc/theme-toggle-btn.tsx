"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="shadow-2xl shadow-black bg-transparent relative h-10 w-10 rounded-lg border-none hover:opacity-85 transition-colors duration-300 cursor-pointer"
    >
      <Sun className="text-nav-txt absolute h-5 w-5 scale-150 rotate-0 transition-transform duration-300 dark:scale-0 dark:rotate-90" />
      <Moon className="text-nav-txt absolute h-5 w-5 scale-0 rotate-90 transition-transform duration-300 dark:scale-150 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
