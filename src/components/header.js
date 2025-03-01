"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "system";

  return (
    <header className="sticky top-0 z-50 shadow-sm w-full bg-background/95 border-b border-muted supports-[backdrop-filter]:bg-backdrop/60">
      <div className="container mx-auto flex justify-between px-4 py-4">
        <Link href="/">
          <Image
            src={isDark ? "/vercel.svg" : "globe.svg"}
            alt="logo"
            width={30}
            height={15}
          />
        </Link>
        <ModeToggle defaultTheme="dark"></ModeToggle>
      </div>
    </header>
  );
};

export default Header;
