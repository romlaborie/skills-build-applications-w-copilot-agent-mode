const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(path) {
  return `${apiBaseUrl}${path}`
}

export function collectionFromResponse(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key]
  }

  for (const candidate of ['results', 'items', 'data', 'docs']) {
    if (Array.isArray(payload?.[candidate])) {
      return payload[candidate]
    }
  }

  return []
}