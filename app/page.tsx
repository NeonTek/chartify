"use client"

import type React from "react"
import { ArrowRight, CheckCircle2, Shield, Upload, Share2, ImageDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const neontekApps = [
    { name: "App One", href: "https://neontek.coke/apps/app-one", description: "A brief, compelling description of App One." },
    { name: "App Two", href: "https://neontek.coke/apps/app-two", description: "A brief, compelling description of App Two." },
    { name: "App Three", href: "https://neontek.coke/apps/app-three", description: "A brief, compelling description of App Three." },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="https://neontek.coke" className="flex items-center gap-2">
            <img src="/neontek-logo.png" alt="NeonTek Logo" className="h-8 w-auto" />
            <span className="text-lg font-semibold sr-only md:not-sr-only">NeonTek</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="https://neontek.coke/apps" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
              Apps
            </Link>
            <Link href="/app">
              <Button>Launch Chartify <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Chartify: Instant, in-browser <br className="hidden md:inline" />
              data visualization. 📊
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:max-w-xl">
              Powered by NeonTek, **Chartify** lets you upload any CSV, JSON, or Excel file and create professional charts in seconds. All processing is **client-side**, ensuring your data remains private and secure.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link href="/app">
                <Button size="lg" className="shadow-lg">
                  Start Charting <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" size="lg" className="text-primary hover:text-primary-foreground">Learn more</Button>
              </a>
            </div>
            <div className="mt-8 grid gap-3 text-sm font-medium text-muted-foreground md:grid-cols-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>No account required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Works offline after initial load</span>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 flex items-center justify-center">
            <img
              src="/hero.jpg"
              alt="Chartify dashboard preview"
              className="w-full rounded-xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className="absolute top-0 right-0 p-4">
              <Button variant="ghost" className="bg-background/80 backdrop-blur-sm shadow-md">
                Live Demo
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Core Features</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">All the power, none of the hassle.</h2>
            <p className="mt-2 text-lg text-muted-foreground">Chartify simplifies your data workflow with powerful, in-browser tools.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Upload className="h-6 w-6" />}
              title="Drag & Drop Upload"
              desc="Seamlessly upload CSV, JSON, or Excel files. Our smart parser automatically infers data types and headers."
            />
            <Feature
              icon={<Shield className="h-6 w-6" />}
              title="Data Privacy First"
              desc="Your data is your own. All processing happens locally in your browser, with no data ever sent to a server."
            />
            <Feature
              icon={<Share2 className="h-6 w-6" />}
              title="Instantly Shareable"
              desc="Create a unique, shareable URL for your visualization. Anyone with the link can view your chart instantly."
            />
            <Feature
              icon={<ImageDown className="h-6 w-6" />}
              title="High-Res Exports"
              desc="Download a beautiful, high-resolution PNG image of your chart, perfect for presentations or reports."
            />
            <Feature
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Powerful Customization"
              desc="Customize your charts with multiple types, palettes, titles, and filters to tell your data's story."
            />
            <Feature
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Interactive Workflow"
              desc="Map columns to chart axes with a simple drag-and-drop interface, making chart creation intuitive and fast."
            />
          </div>
        </section>

        <Separator className="my-16" />

        {/* Other Apps Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">More from NeonTek</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Beyond visualization, powerful tools for every need.</h2>
            <p className="mt-2 text-lg text-muted-foreground">Chartify is just one of our many tools designed to help you succeed.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {neontekApps.map((app, index) => (
              <a key={index} href={app.href} target="_blank" rel="noopener noreferrer">
                <AppCard name={app.name} description={app.description} />
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="https://neontek.coke/apps">
              <Button size="lg" variant="outline">
                See all apps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Final Call to Action Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-500 p-8 text-primary-foreground shadow-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to visualize your data?</h2>
            <p className="mt-4 text-lg font-light opacity-90 md:max-w-2xl mx-auto">
              Skip the complex software and server setups. Launch Chartify and start creating your first chart in seconds.
            </p>
            <div className="mt-8">
              <Link href="/app">
                <Button size="lg" variant="secondary" className="font-semibold shadow-lg">
                  Launch Chartify <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Separator />

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 py-10 text-center text-xs text-muted-foreground">
        <p className="mt-1">&copy; {new Date().getFullYear()} NeonTek. All Rights Reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="https://neontek.coke/legal/terms-of-use" className="hover:underline">Terms of Use</Link>
          <Link href="https://neontek.coke/privacy-policy" className="hover:underline">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-base text-muted-foreground">{desc}</p>
    </div>
  )
}

function AppCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-base text-muted-foreground">{description}</p>
      <div className="mt-4">
        <Button variant="ghost" className="text-primary hover:text-primary/80">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}