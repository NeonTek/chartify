"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Share2, PanelRight, Trash2, Plus, Hash, Calendar, Type, X, Wand2, Download } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import ChartCanvas, { type ChartCanvasAPI } from "@/components/chart-canvas"
import DataUpload from "@/components/data-upload"
import type {
  ColumnMeta,
  ChartType,
  AppState,
  MappingBarLine,
  MappingScatter,
  MappingPie,
  FilterRule,
  ColumnType,
} from "@/lib/types"
import { inferColumnsFromRows, applyFilters } from "@/lib/utils-data"
import { palettes, paletteOptions } from "@/lib/palettes"
import { decodeStateFromHash, encodeStateToHash } from "@/lib/share"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"

// Icons for data types
const TypeIcon = ({ t }: { t: ColumnType }) => {
  if (t === "number") return <Hash className="h-4 w-4 text-emerald-600" aria-hidden />
  if (t === "date") return <Calendar className="h-4 w-4 text-amber-600" aria-hidden />
  return <Type className="h-4 w-4 text-slate-600" aria-hidden />
}

export default function Page() {
  const { toast } = useToast()
  // Global app state
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<ColumnMeta[]>([])
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [paletteKey, setPaletteKey] = useState<string>("blueGreen")
  const [showLegend, setShowLegend] = useState<boolean>(true)
  const [showDataLabels, setShowDataLabels] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [xLabel, setXLabel] = useState<string>("")
  const [yLabel, setYLabel] = useState<string>("")
  const [filters, setFilters] = useState<FilterRule[]>([])
  // Mappings by chart type
  const [mapBarLine, setMapBarLine] = useState<MappingBarLine>({ x: "", y: "", groupBy: "", summary: "sum" })
  const [mapScatter, setMapScatter] = useState<MappingScatter>({ x: "", y: "", groupBy: "" })
  const [mapPie, setMapPie] = useState<MappingPie>({ category: "", value: "" })
  // Assignment target state for accessible click-to-assign
  const [activeAssignTarget, setActiveAssignTarget] = useState<string | null>(null)
  // Right config drawer (mobile)
  const [configOpen, setConfigOpen] = useState<boolean>(false)
  // Chart export API
  const [chartAPI, setChartAPI] = useState<ChartCanvasAPI | null>(null)

  // Handle data upload result
  const onDataLoaded = (data: any[]) => {
    setRows(data)
    const inferred = inferColumnsFromRows(data)
    setColumns(inferred)
    // Reset mappings sensibly
    const firstNum = inferred.find((c) => c.type === "number")?.name || ""
    const firstCat = inferred.find((c) => c.type !== "number")?.name || ""
    setMapBarLine((m) => ({ ...m, x: firstCat, y: firstNum }))
    setMapScatter((m) => ({ ...m, x: firstNum, y: firstNum && firstNum !== m.x ? firstNum : firstNum }))
    setMapPie((m) => ({ ...m, category: firstCat, value: firstNum }))
    setFilters([])
  }

  // Drag and drop handlers for column chips
  const onDragStartCol = (e: React.DragEvent, colName: string) => {
    e.dataTransfer.setData("text/plain", colName)
    e.dataTransfer.effectAllowed = "copyMove"
  }

  const assignColumn = (targetKey: string, colName: string) => {
    if (chartType === "bar" || chartType === "line") {
      if (targetKey === "x") setMapBarLine((m) => ({ ...m, x: colName }))
      if (targetKey === "y") setMapBarLine((m) => ({ ...m, y: colName }))
      if (targetKey === "groupBy") setMapBarLine((m) => ({ ...m, groupBy: colName }))
    } else if (chartType === "scatter") {
      if (targetKey === "x") setMapScatter((m) => ({ ...m, x: colName }))
      if (targetKey === "y") setMapScatter((m) => ({ ...m, y: colName }))
      if (targetKey === "groupBy") setMapScatter((m) => ({ ...m, groupBy: colName }))
    } else if (chartType === "pie") {
      if (targetKey === "category") setMapPie((m) => ({ ...m, category: colName }))
      if (targetKey === "value") setMapPie((m) => ({ ...m, value: colName }))
    }
  }

  const DropField = ({
    label,
    targetKey,
    assigned,
    allowedTypes,
    onClear,
  }: {
    label: string
    targetKey: string
    assigned?: string
    allowedTypes?: ColumnType[]
    onClear?: () => void
  }) => {
    const onDrop = (e: React.DragEvent) => {
      e.preventDefault()
      const colName = e.dataTransfer.getData("text/plain")
      assignColumn(targetKey, colName)
      setActiveAssignTarget(null)
    }
    const onDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
    }
    const isActive = activeAssignTarget === targetKey
    const assignedType = assigned ? columns.find((c) => c.name === assigned)?.type : undefined
    const allowedText = allowedTypes && allowedTypes.length ? `Allowed: ${allowedTypes.join(", ")}` : "Any column"

    return (
      <div className="space-y-1">
        <Label className="text-xs">{label}</Label>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveAssignTarget(targetKey)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setActiveAssignTarget(targetKey)
          }}
          onDrop={onDrop}
          onDragOver={onDragOver}
          aria-label={`Drop a column into ${label}`}
          className={cn(
            "flex items-center justify-between rounded-md border p-2 text-sm transition-colors",
            isActive ? "border-primary ring-2 ring-primary/30" : "border-border",
            "min-h-[40px] bg-background",
          )}
        >
          {!assigned ? (
            <span className="text-muted-foreground">
              {isActive ? "Click a column to assign…" : "Drag a column here"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <TypeIcon t={assignedType || "text"} />
              <span className="font-medium">{assigned}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClear?.()
                }}
                className="ml-2 text-muted-foreground hover:text-foreground"
                aria-label={`Clear ${label}`}
                title="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          <span className="ml-2 text-[10px] text-muted-foreground">{allowedText}</span>
        </div>
      </div>
    )
  }

  // Assign via column click when a target is active
  const onColumnClickAssign = (colName: string) => {
    if (activeAssignTarget) {
      assignColumn(activeAssignTarget, colName)
      setActiveAssignTarget(null)
    }
  }

  // Share: encode state into URL hash
  const onShare = () => {
    if (!rows) {
      toast({ title: "Nothing to share", description: "Upload data and configure a chart first." })
      return
    }
    const appState: AppState = {
      rows,
      columns,
      chartType,
      paletteKey,
      showLegend,
      showDataLabels,
      title,
      xLabel,
      yLabel,
      filters,
      mappings: { barLine: mapBarLine, scatter: mapScatter, pie: mapPie },
    }
    try {
      const url = encodeStateToHash(window.location.origin + window.location.pathname, appState)
      navigator.clipboard.writeText(url).then(() => {
        toast({ title: "Share link copied", description: "Anyone with the link can view this visualization." })
      })
    } catch {
      toast({
        title: "Share failed",
        description: "State may be too large for the URL. Try with a smaller dataset.",
        variant: "destructive",
      })
    }
  }

  // Export PNG
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

  const onExportPNG = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const baseName = title ? slugify(title) : "chartify-chart";
    const uniqueName = `${baseName}-${randomString}.png`;

    chartAPI?.exportPNG({ filename: uniqueName });
  }

  // Rehydrate state from URL hash if present
  useEffect(() => {
    try {
      const restored = decodeStateFromHash(window.location.hash)
      if (restored) {
        setRows(restored.rows || [])
        setColumns(restored.columns || [])
        setChartType(restored.chartType || "bar")
        setPaletteKey(restored.paletteKey || "blueGreen")
        setShowLegend(!!restored.showLegend)
        setShowDataLabels(!!restored.showDataLabels)
        setTitle(restored.title || "")
        setXLabel(restored.xLabel || "")
        setYLabel(restored.yLabel || "")
        setFilters(restored.filters || [])
        setMapBarLine(restored.mappings?.barLine || { x: "", y: "", groupBy: "", summary: "sum" })
        setMapScatter(restored.mappings?.scatter || { x: "", y: "", groupBy: "" })
        setMapPie(restored.mappings?.pie || { category: "", value: "" })
        toast({ title: "Visualization restored", description: "Loaded from the shared URL." })
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredRows = useMemo(() => applyFilters(rows, filters, columns), [rows, filters, columns])

  const onClearData = () => {
    setRows([])
    setColumns([])
    setFilters([])
    setMapBarLine({ x: "", y: "", groupBy: "", summary: "sum" })
    setMapScatter({ x: "", y: "", groupBy: "" })
    setMapPie({ category: "", value: "" })
    setTitle("")
    setXLabel("")
    setYLabel("")
  }

  // Helpers for mapping clear
  const clearMapField = (key: string) => {
    if (chartType === "bar" || chartType === "line") {
      if (key === "x") setMapBarLine((m) => ({ ...m, x: "" }))
      if (key === "y") setMapBarLine((m) => ({ ...m, y: "" }))
      if (key === "groupBy") setMapBarLine((m) => ({ ...m, groupBy: "" }))
    } else if (chartType === "scatter") {
      if (key === "x") setMapScatter((m) => ({ ...m, x: "" }))
      if (key === "y") setMapScatter((m) => ({ ...m, y: "" }))
      if (key === "groupBy") setMapScatter((m) => ({ ...m, groupBy: "" }))
    } else if (chartType === "pie") {
      if (key === "category") setMapPie((m) => ({ ...m, category: "" }))
      if (key === "value") setMapPie((m) => ({ ...m, value: "" }))
    }
  }

  // Filters UI
  const addFilter = () => {
    const firstCol = columns[0]?.name || ""
    setFilters((f) => [...f, { id: crypto.randomUUID(), column: firstCol, op: "equals", value: "", value2: "" }])
  }

  const removeFilter = (id: string) => {
    setFilters((f) => f.filter((r) => r.id !== id))
  }

  const updateFilter = (id: string, patch: Partial<FilterRule>) => {
    setFilters((f) => f.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const getOpsForType = (t: ColumnType) => {
    if (t === "number" || t === "date") {
      return ["=", "!=", ">", ">=", "<", "<=", "between"]
    }
    return ["contains", "equals", "startsWith", "endsWith"]
  }

  const getColType = (name: string): ColumnType => {
    return columns.find((c) => c.name === name)?.type || "text"
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col">
      <Header />

        <div className="flex min-h-screen">
          {/* Left: Data Panel as collapsible sidebar */}
          <Sidebar collapsible="icon">
            <SidebarHeader className="px-2 py-2">
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" aria-hidden />
                <span className="font-semibold">Chartify</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Data</SidebarGroupLabel>
                <SidebarGroupContent>
                  {!rows.length ? (
                    <div className="p-2">
                      <DataUpload onDataLoaded={onDataLoaded} />
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {columns.length} columns • {filteredRows.length}/{rows.length} rows
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClearData} aria-label="Clear data">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Separator />
                      <SidebarMenu>
                        {columns.map((col) => (
                          <SidebarMenuItem key={col.name}>
                            <SidebarMenuButton
                              className="cursor-grab active:cursor-grabbing"
                              draggable
                              onDragStart={(e) => onDragStartCol(e, col.name)}
                              onClick={() => onColumnClickAssign(col.name)}
                              title={`Drag to a field. Type: ${col.type}`}
                            >
                              <TypeIcon t={col.type} />
                              <span>{col.name}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </div>
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Center + Right */}
          <SidebarInset>
            {/* Header */}
            <header className="sticky top-0 z-20 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-2">
                <SidebarTrigger />
                <div className="flex-1" />
                {/* Mobile config */}
                <Sheet open={configOpen} onOpenChange={setConfigOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                      <PanelRight className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[90vw] sm:w-[480px] p-0">
                    <SheetHeader className="px-4 py-3">
                      <SheetTitle>Configuration</SheetTitle>
                    </SheetHeader>
                    <div className="h-[calc(100vh-56px)] overflow-y-auto p-4">
                      <ConfigPanel
                        chartType={chartType}
                        setChartType={setChartType}
                        mapBarLine={mapBarLine}
                        setMapBarLine={setMapBarLine}
                        mapScatter={mapScatter}
                        setMapScatter={setMapScatter}
                        mapPie={mapPie}
                        setMapPie={setMapPie}
                        paletteKey={paletteKey}
                        setPaletteKey={setPaletteKey}
                        showLegend={showLegend}
                        setShowLegend={setShowLegend}
                        showDataLabels={showDataLabels}
                        setShowDataLabels={setShowDataLabels}
                        title={title}
                        setTitle={setTitle}
                        xLabel={xLabel}
                        setXLabel={setXLabel}
                        yLabel={yLabel}
                        setYLabel={setYLabel}
                        columns={columns}
                        DropField={DropField}
                        clearMapField={clearMapField}
                        filters={filters}
                        addFilter={addFilter}
                        removeFilter={removeFilter}
                        updateFilter={updateFilter}
                        getOpsForType={getOpsForType}
                        getColType={getColType}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExportPNG}
                  className="hidden sm:inline-flex bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export PNG
                </Button>
                <Button variant="outline" size="sm" onClick={onShare} className="hidden sm:inline-flex bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[1fr_360px] lg:grid-cols-[1fr_420px]">
              {/* Visualization Canvas */}
              <section className="order-2 md:order-1 rounded-lg border bg-card p-3">
                {!rows.length ? (
                  <div className="flex h-[65vh] items-center justify-center">
                    <div className="max-w-md text-center">
                      <h1 className="mb-2 text-2xl font-semibold">Upload your Data (CSV, XLS or JSON)</h1>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Drag a file into the left panel, or use the upload button to get started. All processing stays in
                        your browser.
                      </p>
                      <div className="mx-auto w-full max-w-sm">
                        <DataUpload onDataLoaded={onDataLoaded} inline />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <ChartCanvas
                      rows={filteredRows}
                      columns={columns}
                      chartType={chartType}
                      mapBarLine={mapBarLine}
                      mapScatter={mapScatter}
                      mapPie={mapPie}
                      palette={palettes[paletteKey] || palettes.blueGreen}
                      title={title}
                      xLabel={xLabel}
                      yLabel={yLabel}
                      showLegend={showLegend}
                      showDataLabels={showDataLabels}
                      onReady={setChartAPI}
                    />
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:hidden">
                      <Button variant="outline" onClick={onExportPNG} className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" /> Export PNG
                      </Button>
                      <Button variant="outline" onClick={onShare} className="w-full bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </>
                )}
              </section>

              {/* Right Configuration Panel (desktop) */}
              <aside className="order-1 md:order-2 hidden md:block">
                <div className="sticky top-[56px] max-h-[calc(100vh-56px)] overflow-y-auto rounded-lg border bg-card p-4">
                  <ConfigPanel
                    chartType={chartType}
                    setChartType={setChartType}
                    mapBarLine={mapBarLine}
                    setMapBarLine={setMapBarLine}
                    mapScatter={mapScatter}
                    setMapScatter={setMapScatter}
                    mapPie={mapPie}
                    setMapPie={setMapPie}
                    paletteKey={paletteKey}
                    setPaletteKey={setPaletteKey}
                    showLegend={showLegend}
                    setShowLegend={setShowLegend}
                    showDataLabels={showDataLabels}
                    setShowDataLabels={setShowDataLabels}
                    title={title}
                    setTitle={setTitle}
                    xLabel={xLabel}
                    setXLabel={setXLabel}
                    yLabel={yLabel}
                    setYLabel={setYLabel}
                    columns={columns}
                    DropField={DropField}
                    clearMapField={clearMapField}
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    updateFilter={updateFilter}
                    getOpsForType={getOpsForType}
                    getColType={getColType}
                  />
                  <Separator className="my-4" />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onExportPNG} className="w-1/2 bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Export PNG
                    </Button>
                    <Button variant="outline" onClick={onShare} className="w-1/2 bg-transparent">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </aside>
            </main>
          </SidebarInset>
        </div>
      <Footer />
      </div>

    </SidebarProvider>
  )
}

function ConfigPanel(props: {
  chartType: ChartType
  setChartType: (t: ChartType) => void
  mapBarLine: MappingBarLine
  setMapBarLine: (m: MappingBarLine) => void
  mapScatter: MappingScatter
  setMapScatter: (m: MappingScatter) => void
  mapPie: MappingPie
  setMapPie: (m: MappingPie) => void
  paletteKey: string
  setPaletteKey: (k: string) => void
  showLegend: boolean
  setShowLegend: (v: boolean) => void
  showDataLabels: boolean
  setShowDataLabels: (v: boolean) => void
  title: string
  setTitle: (t: string) => void
  xLabel: string
  setXLabel: (t: string) => void
  yLabel: string
  setYLabel: (t: string) => void
  columns: ColumnMeta[]
  DropField: React.ComponentType<any>
  clearMapField: (key: string) => void
  filters: FilterRule[]
  addFilter: () => void
  removeFilter: (id: string) => void
  updateFilter: (id: string, patch: Partial<FilterRule>) => void
  getOpsForType: (t: ColumnType) => string[]
  getColType: (name: string) => ColumnType
}) {
  const {
    chartType,
    setChartType,
    mapBarLine,
    setMapBarLine,
    mapScatter,
    setMapScatter,
    mapPie,
    setMapPie,
    paletteKey,
    setPaletteKey,
    showLegend,
    setShowLegend,
    showDataLabels,
    setShowDataLabels,
    title,
    setTitle,
    xLabel,
    setXLabel,
    yLabel,
    setYLabel,
    columns,
    DropField,
    clearMapField,
    filters,
    addFilter,
    removeFilter,
    updateFilter,
    getOpsForType,
    getColType,
  } = props

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Chart Type</Label>
        <Select value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="scatter">Scatter Plot</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Mappings */}
      {["bar", "line"].includes(chartType) && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Mappings</h3>
          <DropField
            label="X-Axis"
            targetKey="x"
            assigned={mapBarLine.x}
            allowedTypes={["text", "date", "number"]}
            onClear={() => clearMapField("x")}
          />
          <DropField
            label="Y-Axis (numeric)"
            targetKey="y"
            assigned={mapBarLine.y}
            allowedTypes={["number"]}
            onClear={() => clearMapField("y")}
          />
          <DropField
            label="Group By (optional)"
            targetKey="groupBy"
            assigned={mapBarLine.groupBy}
            allowedTypes={["text", "date", "number"]}
            onClear={() => clearMapField("groupBy")}
          />
          <div className="space-y-2">
            <Label>Summary</Label>
            <Select
              value={mapBarLine.summary}
              onValueChange={(v) => setMapBarLine({ ...mapBarLine, summary: v as "sum" | "count" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Summary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="count">Count</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {chartType === "scatter" && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Mappings</h3>
          <DropField
            label="X (numeric)"
            targetKey="x"
            assigned={mapScatter.x}
            allowedTypes={["number"]}
            onClear={() => clearMapField("x")}
          />
          <DropField
            label="Y (numeric)"
            targetKey="y"
            assigned={mapScatter.y}
            allowedTypes={["number"]}
            onClear={() => clearMapField("y")}
          />
          <DropField
            label="Group By (optional)"
            targetKey="groupBy"
            assigned={mapScatter.groupBy}
            allowedTypes={["text", "date", "number"]}
            onClear={() => clearMapField("groupBy")}
          />
        </div>
      )}

      {chartType === "pie" && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Mappings</h3>
          <DropField
            label="Category"
            targetKey="category"
            assigned={mapPie.category}
            allowedTypes={["text", "date", "number"]}
            onClear={() => clearMapField("category")}
          />
          <DropField
            label="Value (numeric)"
            targetKey="value"
            assigned={mapPie.value}
            allowedTypes={["number"]}
            onClear={() => clearMapField("value")}
          />
        </div>
      )}

      <Separator />

      {/* Colors */}
      <div className="space-y-2">
        <Label>Colors</Label>
        <Select value={paletteKey} onValueChange={setPaletteKey}>
          <SelectTrigger>
            <SelectValue placeholder="Color palette" />
          </SelectTrigger>
          <SelectContent>
            {paletteOptions.map((opt) => (
              <SelectItem key={opt.key} value={opt.key}>
                <div className="flex items-center gap-2">
                  <span className="w-24">{opt.label}</span>
                  <span className="flex items-center gap-1">
                    {palettes[opt.key].map((c, i) => (
                      <span key={i} className="h-3 w-3 rounded-sm border" style={{ backgroundColor: c }} />
                    ))}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Labels */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Labels</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="legend">Show legend</Label>
          <Switch id="legend" checked={showLegend} onCheckedChange={setShowLegend} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dlabels">Show data labels</Label>
          <Switch id="dlabels" checked={showDataLabels} onCheckedChange={setShowDataLabels} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Chart title" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="xlabel">X Label</Label>
            <Input id="xlabel" value={xLabel} onChange={(e) => setXLabel(e.target.value)} placeholder="X axis label" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ylabel">Y Label</Label>
            <Input id="ylabel" value={yLabel} onChange={(e) => setYLabel(e.target.value)} placeholder="Y axis label" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Filters</h3>
          <Button size="sm" variant="outline" onClick={addFilter}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
        {filters.length === 0 ? (
          <p className="text-xs text-muted-foreground">No filters applied.</p>
        ) : (
          <div className="space-y-2">
            {filters.map((f) => {
              const t = getColType(f.column)
              const ops = getOpsForType(t)
              return (
                <div key={f.id} className="rounded-md border p-2">
                  <div className="mb-2 flex items-center gap-2">
                    <Select value={f.column} onValueChange={(v) => updateFilter(f.id, { column: v })}>
                      <SelectTrigger className="w-[40%]">
                        <SelectValue placeholder="Column" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((c) => (
                          <SelectItem value={c.name} key={c.name}>
                            <div className="flex items-center gap-2">
                              <TypeIcon t={c.type} />
                              <span>{c.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={f.op} onValueChange={(v) => updateFilter(f.id, { op: v })}>
                      <SelectTrigger className="w-[35%]">
                        <SelectValue placeholder="Op" />
                      </SelectTrigger>
                      <SelectContent>
                        {ops.map((o) => (
                          <SelectItem value={o} key={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => removeFilter(f.id)} aria-label="Remove filter">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder={t === "date" ? "Value (YYYY-MM-DD)" : "Value"}
                      value={f.value}
                      onChange={(e) => updateFilter(f.id, { value: e.target.value })}
                    />
                    {f.op === "between" && (
                      <Input
                        placeholder={t === "date" ? "And (YYYY-MM-DD)" : "And"}
                        value={f.value2}
                        onChange={(e) => updateFilter(f.id, { value2: e.target.value })}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
