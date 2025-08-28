"use client"

import type React from "react"
import { ArrowRight, CheckCircle2, Shield, Upload, Share2, ImageDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const neontekApps = [
    { name: "App One", href: "https://neontek.co.ke/apps/app-one", description: "A brief, compelling description of App One." },
    { name: "App Two", href: "https://neontek.co.ke/apps/app-two", description: "A brief, compelling description of App Two." },
    { name: "App Three", href: "https://neontek.co.ke/apps/app-three", description: "A brief, compelling description of App Three." },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/90 backdrop-blur-sm transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Product Name */}
          <Link href="https://neontek.co.ke" className="flex items-center space-x-2">
            <Image src="/neontek-logo(transparent).png" alt="NeonTek Logo" width={32} height={32} className="h-8 w-auto" />
            <div className="hidden h-6 w-px bg-gray-300 md:block" />
            <span className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Chartify
            </span>
          </Link>

          {/* Navigation and CTA */}
          <nav className="flex items-center space-x-4">
            <Link href="https://neontek.co.ke/apps" className="hidden text-sm font-medium text-muted-foreground hover:text-cyan-500 transition-colors sm:inline-block">
              Apps
            </Link>
            <Link href="/app">
              <Button className="bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200">
                Launch App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                <Button size="lg" className="bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg">
                  Start Charting <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" size="lg" className="text-cyan-500 hover:bg-cyan-50">Learn more</Button>
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
            <Image
              src="/hero.jpg"
              alt="Chartify dashboard preview"
              width={800}
              height={600}
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
            <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-500">Core Features</span>
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
            <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-500">More from NeonTek</span>
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
            <Link href="https://neontek.co.ke/apps">
              <Button size="lg" variant="outline" className="text-cyan-500 border-cyan-500 hover:bg-cyan-50">
                See all apps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Final Call to Action Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <div className="rounded-2xl bg-cyan-600 p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to visualize your data?</h2>
            <p className="mt-4 text-lg font-light opacity-90 md:max-w-2xl mx-auto">
              Skip the complex software and server setups. Launch Chartify and start creating your first chart in seconds.
            </p>
            <div className="mt-8">
              <Link href="/app">
                <Button size="lg" variant="secondary" className="font-semibold text-cyan-600 shadow-lg hover:bg-white/90">
                  Launch Chartify <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/neontek-logo(transparent).png" alt="NeonTek Logo" width={40} height={40} className="h-10 w-auto" />
                <span className="text-xl font-bold text-white">Chartify</span>
              </div>
              <p className="text-sm">
                Chartify is a client-side data visualization tool by NeonTek, designed for speed, simplicity, and privacy.
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://twitter.com/neontek" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-6 w-6 text-gray-400 hover:text-cyan-500 transition-colors" />
                </a>
                <a href="https://github.com/neontek" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-6 w-6 text-gray-400 hover:text-cyan-500 transition-colors" />
                </a>
                <a href="https://linkedin.com/company/neontek" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6 text-gray-400 hover:text-cyan-500 transition-colors" />
                </a>
              </div>
            </div>

            {/* Column 2: Chartify */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Chartify</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/app" className="hover:text-cyan-500 transition-colors">Launch App</Link></li>
                <li><Link href="#features" className="hover:text-cyan-500 transition-colors">Features</Link></li>
                <li><Link href="/help" className="hover:text-cyan-500 transition-colors">Help</Link></li>
                <li><Link href="https://blog.neontek.co.ke" className="hover:text-cyan-500 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Column 3: NeonTek */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">NeonTek</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://neontek.co.ke" className="hover:text-cyan-500 transition-colors">About Us</Link></li>
                <li><Link href="https://neontek.co.ke/apps" className="hover:text-cyan-500 transition-colors">Our Apps</Link></li>
                <li><Link href="https://neontek.co.ke/services" className="hover:text-cyan-500 transition-colors">Services</Link></li>
                <li><Link href="https://neontek.co.ke/careers" className="hover:text-cyan-500 transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://neontek.co.ke/legal/terms-of-use" className="hover:text-cyan-500 transition-colors">Terms of Use</Link></li>
                <li><Link href="https://neontek.co.ke/legal/privacy-policy" className="hover:text-cyan-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="https://neontek.co.ke/legal/cookie-policy" className="hover:text-cyan-500 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright and Bottom Links */}
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} NeonTek. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-cyan-100 text-cyan-500">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-base text-gray-500">{desc}</p>
    </div>
  )
}

function AppCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
      <div className="mt-4">
        <Button variant="ghost" className="text-cyan-500 hover:bg-cyan-50">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}