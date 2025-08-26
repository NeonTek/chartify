import type { ColumnMeta, ColumnType, MappingBarLine, MappingPie, MappingScatter } from "./types"

export function inferColumnsFromRows(rows: any[], sampleSize = 100): ColumnMeta[] {
  if (!rows?.length) return []
  const cols = Object.keys(rows[0] || {})
  const take = rows.slice(0, sampleSize)
  return cols.map((name) => {
    const t = inferType(take.map((r) => r?.[name]))
    return { name, type: t }
  })
}

function inferType(values: any[]): ColumnType {
  let numCount = 0
  let dateCount = 0
  let textCount = 0
  const total = values.length || 1
  for (const v of values) {
    if (v === null || v === undefined || v === "") continue
    const s = String(v).trim()
    if (s === "") continue
    const n = Number(s)
    if (!Number.isNaN(n) && Number.isFinite(n)) {
      numCount++
      continue
    }
    const d = new Date(s)
    if (!isNaN(d.getTime())) {
      dateCount++
      continue
    }
    textCount++
  }
  if (numCount / total > 0.6) return "number"
  if (dateCount / total > 0.6) return "date"
  return "text"
}

export function applyFilters(rows: any[], filters: any[], columns: ColumnMeta[]) {
  if (!filters?.length) return rows
  return rows.filter((row) => {
    return filters.every((f: any) => {
      const val = row?.[f.column]
      const t = columns.find((c) => c.name === f.column)?.type || "text"
      return matches(val, f.op, f.value, f.value2, t)
    })
  })
}

function matches(val: any, op: string, value: string, value2: string, type: ColumnType) {
  if (type === "number") {
    const v = Number(val)
    const a = Number(value)
    const b = Number(value2)
    switch (op) {
      case "=":
        return v === a
      case "!=":
        return v !== a
      case ">":
        return v > a
      case ">=":
        return v >= a
      case "<":
        return v < a
      case "<=":
        return v <= a
      case "between":
        return v >= Math.min(a, b) && v <= Math.max(a, b)
      default:
        return true
    }
  } else if (type === "date") {
    const t = new Date(val).getTime()
    const a = new Date(value).getTime()
    const b = new Date(value2).getTime()
    switch (op) {
      case "=":
        return t === a
      case "!=":
        return t !== a
      case ">":
        return t > a
      case ">=":
        return t >= a
      case "<":
        return t < a
      case "<=":
        return t <= a
      case "between":
        return t >= Math.min(a, b) && t <= Math.max(a, b)
      default:
        return true
    }
  } else {
    const s = String(val ?? "").toLowerCase()
    const a = String(value ?? "").toLowerCase()
    switch (op) {
      case "contains":
        return s.includes(a)
      case "equals":
        return s === a
      case "startsWith":
        return s.startsWith(a)
      case "endsWith":
        return s.endsWith(a)
      default:
        return true
    }
  }
}

type BuildArgs = {
  rows: any[]
  columns: ColumnMeta[]
  chartType: "bar" | "line" | "scatter" | "pie"
  mapBarLine: MappingBarLine
  mapScatter: MappingScatter
  mapPie: MappingPie
  palette: string[]
}

export function buildChartData(args: BuildArgs) {
  const { chartType } = args
  if (chartType === "bar") return buildBarLine(args, "bar")
  if (chartType === "line") return buildBarLine(args, "line")
  if (chartType === "scatter") return buildScatter(args)
  if (chartType === "pie") return buildPie(args)
  return { data: { labels: [], datasets: [] } }
}

function buildBarLine(args: BuildArgs, kind: "bar" | "line") {
  const { rows, mapBarLine, palette } = args
  const xKey = mapBarLine.x
  const yKey = mapBarLine.y
  const gKey = mapBarLine.groupBy || ""
  const summary = mapBarLine.summary

  if (!xKey || !yKey) {
    return { data: { labels: [], datasets: [] } }
  }

  // Build categories for X
  const xValues = Array.from(new Set(rows.map((r) => String(r?.[xKey]))))
  if (!gKey) {
    // Single dataset
    const aggregated = xValues.map((x) => {
      const subset = rows.filter((r) => String(r?.[xKey]) === x)
      if (summary === "count") return subset.length
      const sum = subset.reduce((acc, r) => acc + (Number(r?.[yKey]) || 0), 0)
      return sum
    })
    const datasets = [
      {
        label: yKey,
        data: aggregated,
        backgroundColor: palette[0],
        borderColor: palette[0],
        borderWidth: kind === "line" ? 2 : 1,
        fill: kind === "line" ? false : true,
        tension: kind === "line" ? 0.3 : 0,
      },
    ]
    return { data: { labels: xValues, datasets } }
  } else {
    // Grouped datasets by group key
    const groups = Array.from(new Set(rows.map((r) => String(r?.[gKey]))))
    const datasets = groups.map((g, i) => {
      const color = palette[i % palette.length]
      const data = xValues.map((x) => {
        const subset = rows.filter((r) => String(r?.[xKey]) === x && String(r?.[gKey]) === g)
        if (summary === "count") return subset.length
        const sum = subset.reduce((acc, r) => acc + (Number(r?.[yKey]) || 0), 0)
        return sum
      })
      return {
        label: g,
        data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: kind === "line" ? 2 : 1,
        fill: kind === "line" ? false : true,
        tension: kind === "line" ? 0.3 : 0,
      }
    })
    return { data: { labels: xValues, datasets } }
  }
}

function buildScatter(args: BuildArgs) {
  const { rows, mapScatter, palette } = args
  const xKey = mapScatter.x
  const yKey = mapScatter.y
  const gKey = mapScatter.groupBy || ""

  if (!xKey || !yKey) {
    return { data: { datasets: [] } }
  }

  if (!gKey) {
    const points = rows
      .map((r) => ({ x: Number(r?.[xKey]), y: Number(r?.[yKey]) }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
    return {
      data: {
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: points,
            backgroundColor: palette[0],
          },
        ],
      },
    }
  } else {
    const groups = Array.from(new Set(rows.map((r) => String(r?.[gKey]))))
    const datasets = groups.map((g, i) => {
      const points = rows
        .filter((r) => String(r?.[gKey]) === g)
        .map((r) => ({ x: Number(r?.[xKey]), y: Number(r?.[yKey]) }))
        .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
      return {
        label: g,
        data: points,
        backgroundColor: palette[i % palette.length],
      }
    })
    return { data: { datasets } }
  }
}

function buildPie(args: BuildArgs) {
  const { rows, mapPie, palette } = args
  const cKey = mapPie.category
  const vKey = mapPie.value

  if (!cKey || !vKey) return { data: { labels: [], datasets: [] } }

  const groups = groupBy(rows, (r) => String(r?.[cKey]))
  const labels = Array.from(groups.keys())
  const values = labels.map((lab) => {
    const subset = groups.get(lab) || []
    const sum = subset.reduce((acc, r) => acc + (Number(r?.[vKey]) || 0), 0)
    return sum
  })
  const colors = labels.map((_, i) => palette[i % palette.length])
  return {
    data: {
      labels,
      datasets: [{ label: vKey, data: values, backgroundColor: colors, borderColor: "#fff", borderWidth: 1 }],
    },
  }
}

function groupBy<T>(arr: T[], keyFn: (t: T) => string) {
  const m = new Map<string, T[]>()
  for (const item of arr) {
    const k = keyFn(item)
    const list = m.get(k) || []
    list.push(item)
    m.set(k, list)
  }
  return m
}
