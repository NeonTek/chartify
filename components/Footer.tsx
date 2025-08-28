"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/neontek-logo(transparent).png"
                alt="NeonTek Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Chartify</span>
            </div>
            <p className="text-sm">
              Chartify is a client-side data visualization tool by NeonTek,
              designed for speed, simplicity, and privacy.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/neontek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 text-gray-400 transition-colors hover:text-cyan-500" />
              </a>
              <a
                href="https://github.com/neontek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 text-gray-400 transition-colors hover:text-cyan-500" />
              </a>
              <a
                href="https://linkedin.com/company/neontek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 text-gray-400 transition-colors hover:text-cyan-500" />
              </a>
            </div>
          </div>

          {/* Column 2: Chartify */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Chartify</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/app" className="transition-colors hover:text-cyan-500">
                  Launch App
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="transition-colors hover:text-cyan-500"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link href="/help" className="transition-colors hover:text-cyan-500">
                  Help
                </Link>
              </li>
              <li>
                <Link
                  href="https://blog.neontek.co.ke"
                  className="transition-colors hover:text-cyan-500"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: NeonTek */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">NeonTek</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://neontek.co.ke"
                  className="transition-colors hover:text-cyan-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://neontek.co.ke/apps"
                  className="transition-colors hover:text-cyan-500"
                >
                  Our Apps
                </Link>
              </li>
              <li>
                <Link
                  href="https://neontek.co.ke/services"
                  className="transition-colors hover:text-cyan-500"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="https://neontek.co.ke/careers"
                  className="transition-colors hover:text-cyan-500"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://neontek.co.ke/legal/terms-of-use"
                  className="transition-colors hover:text-cyan-500"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="https://neontek.co.ke/legal/privacy-policy"
                  className="transition-colors hover:text-cyan-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://neontek.co.ke/legal/cookie-policy"
                  className="transition-colors hover:text-cyan-500"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NeonTek. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}