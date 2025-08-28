"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-white font-inter">
            <Header />
            <div className="max-w-xl space-y-8 rounded-2xl bg-slate-900 p-8 shadow-2xl sm:p-12">
                <h1 className="select-none text-9xl font-extrabold tracking-widest text-gray-700">
                    404
                </h1>

                {/* Main message */}
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Page Not Found
                    </h2>
                    <p className="text-sm text-gray-400 sm:text-base">
                        Oops! It looks like the page you are trying to reach doesn't exist
                        or has been moved. Don't worry, we'll get you back on track.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {/* Link to the home page */}
                    <Link href="/" className="group flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                        <Home className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-12" />
                        Return to Homepage
                    </Link>

                    {/* Optional: a link to contact support or a different part of the site */}
                    <Link href="https://neontek.co.ke/contact" className="group flex items-center justify-center rounded-full border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 transition-colors duration-300 ease-in-out hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-slate-900">
                        Contact Support
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
