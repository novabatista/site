export type QueryStringObject  = Record<string, string | number | boolean | undefined>

export function objectToQueryString(params: QueryStringObject ): string {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

  return queryParams
}