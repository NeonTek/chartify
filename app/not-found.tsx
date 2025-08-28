"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";

const floatingKeyframes = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const glitchKeyframes = `
  @keyframes glitch {
    0% {
      text-shadow: 2px 2px #ff00c1, -2px -2px #00ffff;
      transform: translate(0);
    }
    25% {
      text-shadow: -2px -2px #ff00c1, 2px 2px #00ffff;
      transform: translate(2px, -2px);
    }
    50% {
      text-shadow: 2px -2px #ff00c1, -2px 2px #00ffff;
      transform: translate(-2px, 2px);
    }
    75% {
      text-shadow: -2px 2px #ff00c1, 2px -2px #00ffff;
      transform: translate(2px, 2px);
    }
    100% {
      text-shadow: 2px 2px #ff00c1, -2px -2px #00ffff;
      transform: translate(0);
    }
  }
`;

export default function NotFoundPage() {
    return (
        <>
            <style jsx>{`
                .float-animation {
                    animation: float 4s ease-in-out infinite;
                }
                .glitch-animation {
                    animation: glitch 1.5s infinite;
                }
                ${floatingKeyframes}
                ${glitchKeyframes}
            `}</style>

            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-white font-inter">
                <Header />
                <div className="flex-grow flex items-center justify-center py-20">
                    <div className="relative max-w-xl space-y-8 rounded-2xl bg-slate-900 p-8 shadow-2xl sm:p-12 float-animation">
                        {/* Animated floating element */}
                        <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-cyan-500 blur-3xl opacity-30 animate-pulse" />
                        <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-pink-500 blur-3xl opacity-30 animate-pulse animation-delay-1000" />

                        {/* Glitching 404 heading */}
                        <h1 className="select-none text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 glitch-animation">
                            404
                        </h1>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                                Lost in Cyberspace? 🧑‍🚀
                            </h2>
                            <p className="text-sm text-gray-400 sm:text-base">
                                It looks like the page you were looking for is off exploring the
                                digital cosmos. Don't worry, we've got a rescue team ready to
                                get you home safely.
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Link href="/" className="group flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                                <Home className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-12" />
                                Beam Me Up, Scotty!
                            </Link>
                            <Link href="https://neontek.co.ke/contact" className="group flex items-center justify-center rounded-full border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 transition-colors duration-300 ease-in-out hover:border-white hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-slate-900">
                                Send a Distress Signal
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}