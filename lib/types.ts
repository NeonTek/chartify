export type ColumnType = "text" | "number" | "date"

export type ColumnMeta = {
  name: string
  type: ColumnType
}

export type ChartType = "bar" | "line" | "scatter" | "pie"

export type MappingBarLine = {
  x: string
  y: string
  groupBy?: string
  summary: "sum" | "count"
}

export type MappingScatter = {
  x: string
  y: string
  groupBy?: string
}

export type MappingPie = {
  category: string
  value: string
}

export type FilterRule = {
  id: string
  column: string
  op: string
  value: string
  value2?: string
}

export type AppState = {
  rows: any[]
  columns: ColumnMeta[]
  chartType: ChartType
  paletteKey: string
  showLegend: boolean
  showDataLabels: boolean
  title: string
  xLabel: string
  yLabel: string
  filters: FilterRule[]
  mappings: {
    barLine: MappingBarLine
    scatter: MappingScatter
    pie: MappingPie
  }
}
