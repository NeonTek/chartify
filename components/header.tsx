"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/90 backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Product Name */}
        <Link href="https://neontek.co.ke" className="flex items-center space-x-2">
          <Image
            src="/neontek-logo(transparent).png"
            alt="NeonTek Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <div className="hidden h-6 w-px bg-gray-300 md:block" />
          <span className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Chartify
          </span>
        </Link>

        {/* Navigation and CTA */}
        <nav className="flex items-center space-x-4">
          <Link
            href="https://neontek.co.ke/apps"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-cyan-500 sm:inline-block"
          >
            Apps
          </Link>
          <Link href="/app">
            <Button className="bg-cyan-500 text-white transition-colors duration-200 hover:bg-cyan-600">
              Launch App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}