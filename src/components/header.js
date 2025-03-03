"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "./mode-toggle";
import Search from "./search";
import { MapPin } from "lucide-react";

const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === "system";

  return (
    <header className="sticky top-0 z-50 shadow-sm w-full bg-background/95 border-b border-muted supports-[backdrop-filter]:bg-backdrop/60">
      <div className="container mx-auto flex justify-between gap-2 px-4 py-4">
        <Link href="/">
          <div className="flex items-center justify-center mt-2 gap-2 cursor-pointer">
            <span>
              <MapPin className="h-6 w-6 text-blue-400" />
            </span>
            <span className="text-sm font-bold md:text-lg tracking-tight">
              My Location
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 justify-end">
          <Search />
          <ModeToggle defaultTheme="dark" />
        </div>
      </div>
    </header>
  );
};

export default Header;
