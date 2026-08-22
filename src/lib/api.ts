const API_PREFIX = '/api'

function apiUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, '')
  return `${API_PREFIX}/${normalizedPath}`
}

export function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(apiUrl(path), {
    ...init,
    credentials: 'include',
  })
}
