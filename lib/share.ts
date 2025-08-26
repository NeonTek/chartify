import LZString from "lz-string"
import type { AppState } from "./types"

export function encodeStateToHash(baseUrl: string, state: AppState) {
  const json = JSON.stringify(state)
  const compressed = LZString.compressToEncodedURIComponent(json)
  const url = `${baseUrl}#state=${compressed}`
  return url
}

export function decodeStateFromHash(hash: string): AppState | null {
  if (!hash || !hash.startsWith("#")) return null
  const params = new URLSearchParams(hash.slice(1))
  const c = params.get("state")
  if (!c) return null
  const json = LZString.decompressFromEncodedURIComponent(c || "")
  if (!json) return null
  return JSON.parse(json) as AppState
}
