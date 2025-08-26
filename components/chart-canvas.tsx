"use client"

import { useEffect, useMemo, useRef } from "react"
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title as TitlePlugin,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Bar, Line, Pie, Scatter } from "react-chartjs-2"
import type { ChartOptions } from "chart.js"
import type { ColumnMeta, ChartType, MappingBarLine, MappingScatter, MappingPie } from "@/lib/types"
import { buildChartData } from "@/lib/utils-data"

ChartJS.register(
  BarElement,
  BarController,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  TitlePlugin,
  ChartDataLabels,
)

export type ChartCanvasAPI = {
  exportPNG: (opts?: { filename?: string; padding?: number; background?: string }) => void
}

export default function ChartCanvas({
  rows = [],
  columns = [],
  chartType = "bar",
  mapBarLine,
  mapScatter,
  mapPie,
  palette,
  title = "",
  xLabel = "",
  yLabel = "",
  showLegend = true,
  showDataLabels = false,
  onReady,
}: {
  rows?: any[]
  columns?: ColumnMeta[]
  chartType?: ChartType
  mapBarLine?: MappingBarLine
  mapScatter?: MappingScatter
  mapPie?: MappingPie
  palette: string[]
  title?: string
  xLabel?: string
  yLabel?: string
  showLegend?: boolean
  showDataLabels?: boolean
  onReady?: (api: ChartCanvasAPI) => void
}) {
  const chartRef = useRef<ChartJS | null>(null)

  const built = useMemo(
    () =>
      buildChartData({
        rows,
        columns,
        chartType,
        mapBarLine: mapBarLine || { x: "", y: "", groupBy: "", summary: "sum" },
        mapScatter: mapScatter || { x: "", y: "", groupBy: "" },
        mapPie: mapPie || { category: "", value: "" },
        palette,
      }),
    [rows, columns, chartType, mapBarLine, mapScatter, mapPie, palette],
  )

  const options: ChartOptions<any> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: showLegend },
        title: {
          display: !!title,
          text: title,
        },
        datalabels: {
          display: showDataLabels,
          color: "#222",
          anchor: "end",
          align: "top",
          formatter: (v: any) => (typeof v === "number" ? v : ""),
          clip: true,
        },
        tooltip: { enabled: true },
      },
      scales:
        chartType === "pie" || chartType === "scatter"
          ? {}
          : {
              x: {
                title: { display: !!xLabel, text: xLabel },
                ticks: { autoSkip: true, maxRotation: 0 },
                grid: { display: false },
              },
              y: {
                title: { display: !!yLabel, text: yLabel },
                ticks: { beginAtZero: true },
                grid: { color: "rgba(0,0,0,0.06)" },
              },
            },
    }),
    [chartType, showLegend, showDataLabels, title, xLabel, yLabel],
  )

  // Provide an export API to parents
  useEffect(() => {
    if (!onReady) return
    const api: ChartCanvasAPI = {
      exportPNG: ({ filename, padding = 40, background = "#ffffff" } = {}) => {
        const chart = chartRef.current
        if (!chart) return
        chart.update()

        const source = chart.canvas as HTMLCanvasElement
        if (!source) return

        // Create an offscreen canvas to compose a nicer image (background, title, footer)
        const titleHeight = title ? 40 : 0
        const footerHeight = 28
        const width = source.width + padding * 2
        const height = source.height + padding * 2 + titleHeight + footerHeight

        const out = document.createElement("canvas")
        out.width = width
        out.height = height
        const ctx = out.getContext("2d")
        if (!ctx) return

        // Background
        ctx.fillStyle = background
        ctx.fillRect(0, 0, width, height)

        // Optional title
        if (title) {
          ctx.fillStyle = "#111827" // slate-900
          ctx.font = "600 24px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "top"
          ctx.fillText(title, width / 2, padding)
        }

        // Draw chart
        const chartY = padding + titleHeight
        ctx.drawImage(source, padding, chartY, source.width, source.height)

        // Footer watermark
        const footer = `Chartify • ${new Date().toLocaleDateString()}`
        ctx.fillStyle = "#6b7280" // slate-500
        ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial"
        ctx.textAlign = "right"
        ctx.textBaseline = "alphabetic"
        ctx.fillText(footer, width - 12, height - 10)

        // Download
        const dataURL = out.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = dataURL
        a.download = filename || "chartify-chart.png"
        a.click()
      },
    }
    onReady(api)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReady, chartType])

  return (
    <div className="h-[65vh] w-full">
      {chartType === "bar" && <Bar ref={chartRef as any} data={built.data as any} options={options} />}
      {chartType === "line" && <Line ref={chartRef as any} data={built.data as any} options={options} />}
      {chartType === "scatter" && <Scatter ref={chartRef as any} data={built.data as any} options={options} />}
      {chartType === "pie" && <Pie ref={chartRef as any} data={built.data as any} options={options} />}
    </div>
  )
}
