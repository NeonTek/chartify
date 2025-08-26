"use client"

import type React from "react"

import { useRef, useState } from "react"
import Papa from "papaparse"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function DataUpload({
  onDataLoaded,
  inline = false,
}: {
  onDataLoaded?: (rows: any[]) => void
  inline?: boolean
}) {
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const parseCSV = (text: string) => {
    const res = Papa.parse(text, { header: true, skipEmptyLines: true })
    return (res.data as any[]).filter((r) => r && Object.keys(r).length > 0)
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return
    const file = files[0]
    setLoading(true)
    try {
      const text = await file.text()
      let data: any[] = []
      if (file.name.toLowerCase().endsWith(".csv")) {
        data = parseCSV(text)
      } else if (file.name.toLowerCase().endsWith(".json")) {
        const parsed = JSON.parse(text)
        data = Array.isArray(parsed) ? parsed : parsed.data || []
      } else {
        // try to detect by content
        if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
          const parsed = JSON.parse(text)
          data = Array.isArray(parsed) ? parsed : parsed.data || []
        } else {
          data = parseCSV(text)
        }
      }
      onDataLoaded?.(data)
    } catch (e) {
      alert("Failed to parse file. Please ensure it's valid CSV or JSON.")
    } finally {
      setLoading(false)
      setDragOver(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // reset input
    if (inputRef.current) inputRef.current.value = ""
  }

  const RenderButton = () => (
    <Button type="button" onClick={() => inputRef.current?.click()} disabled={loading} className="w-full">
      <Upload className="mr-2 h-4 w-4" />
      {loading ? "Parsing…" : "Upload your Data (CSV or JSON)"}
    </Button>
  )

  if (inline) {
    return (
      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.json,application/json,text/csv"
          className="hidden"
          onChange={onChange}
        />
        <RenderButton />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md border border-dashed p-4 text-center ${dragOver ? "bg-muted/40" : ""}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      aria-label="Drag and drop a CSV or JSON file here"
    >
      <Upload className="mb-2 h-6 w-6 text-muted-foreground" aria-hidden />
      <p className="mb-2 text-sm">Drag & drop your CSV or JSON here</p>
      <p className="mb-3 text-xs text-muted-foreground">No data is sent to a server</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.json,application/json,text/csv"
        className="hidden"
        onChange={onChange}
      />
      <RenderButton />
    </div>
  )
}
