"use client"

import type React from "react"
import { useRef, useState } from "react"
import Papa from "papaparse"
import * as XLSX from "xlsx"
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
    let data: any[] = []
    const fileExtension = file.name.toLowerCase().split('.').pop()

    try {
      if (fileExtension === "csv") {
        const text = await file.text()
        data = parseCSV(text)
      } else if (fileExtension === "json") {
        const text = await file.text()
        const parsed = JSON.parse(text)
        data = Array.isArray(parsed) ? parsed : parsed.data || []
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        const arrayBuffer = await file.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        data = XLSX.utils.sheet_to_json(worksheet, { defval: "" })
      } else {
        // Fallback for content detection, now handles text and binary files
        const arrayBuffer = await file.arrayBuffer()
        const decoder = new TextDecoder('utf-8')
        const text = decoder.decode(arrayBuffer)
        if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
          const parsed = JSON.parse(text)
          data = Array.isArray(parsed) ? parsed : parsed.data || []
        } else {
          data = parseCSV(text)
        }
      }
      
      onDataLoaded?.(data)
    } catch (e) {
      console.error(e);
      alert("Failed to parse file. Please ensure it's a valid CSV, JSON, or Excel file.")
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
    if (inputRef.current) inputRef.current.value = ""
  }

  const RenderButton = () => (
    <Button type="button" onClick={() => inputRef.current?.click()} disabled={loading} className="w-full">
      <Upload className="mr-2 h-4 w-4" />
      {loading ? "Parsing…" : "Upload your Data (CSV, JSON, or Excel)"}
    </Button>
  )

  if (inline) {
    return (
      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.json,.xls,.xlsx,application/json,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
      aria-label="Drag and drop a CSV, JSON, or Excel file here"
    >
      <Upload className="mb-2 h-6 w-6 text-muted-foreground" aria-hidden />
      <p className="mb-2 text-sm">Drag & drop your CSV, JSON, or Excel file here</p>
      <p className="mb-3 text-xs text-muted-foreground">No data is sent to a server</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.json,.xls,.xlsx,application/json,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        onChange={onChange}
      />
      <RenderButton />
    </div>
  )
}