"use client"

import type React from "react"

import { ArrowRight, CheckCircle2, Shield, Upload, Share2, ImageDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-md bg-primary/10 text-primary">
              <span className="text-sm font-bold">C</span>
            </div>
            <span className="text-sm font-semibold">Chartify</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/app">
              <Button>
                Launch App <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold md:text-4xl">Interactive, client‑side data visualization.</h1>
            <p className="mt-3 text-muted-foreground">
              Upload CSV or JSON, drag columns, configure your chart, and share a single URL. Everything runs in your
              browser—no servers, no data leaves your device.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/app">
                <Button size="lg">
                  Try Chartify <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features" className="text-sm underline-offset-4 hover:underline">
                Learn more
              </a>
            </div>
            <div className="mt-6 grid gap-2 text-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>No sign-up required</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Works entirely offline after load</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <img
              src="/hero.jpg"
              alt="Chartify dashboard preview"
              className="h-[320px] w-full rounded-md object-cover"
            />
          </div>
        </section>

        <Separator />

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-2xl font-semibold">What you can do</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Upload className="h-5 w-5" />}
              title="Upload CSV/JSON"
              desc="Fast client-side parsing with smart type inference."
            />
            <Feature
              icon={<Shield className="h-5 w-5" />}
              title="Private by design"
              desc="Your data never leaves your browser."
            />
            <Feature
              icon={<Share2 className="h-5 w-5" />}
              title="Shareable links"
              desc="Encode your chart state into a single URL."
            />
            <Feature
              icon={<ImageDown className="h-5 w-5" />}
              title="Export PNG"
              desc="Download a beautifully composed PNG of your chart."
            />
            <Feature
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Flexible charts"
              desc="Bar, Line, Scatter, and Pie with grouping and filters."
            />
            <Feature
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Drag and drop"
              desc="Assign columns to fields with drag-and-drop or clicks."
            />
          </div>
          <div className="mt-8">
            <Link href="/app">
              <Button size="lg">
                Launch App <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <Separator />

        {/* Footer */}
        <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-muted-foreground">
          <p>&copy; NeonTek</p>
          <p className="mt-1">All Rigts Reserved</p>
        </footer>
      </main>
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="grid size-8 place-items-center rounded-md bg-primary/10 text-primary">{icon}</div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
