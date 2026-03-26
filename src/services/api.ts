const API_URL = import.meta.env.VITE_API_URL

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  let data: unknown = null

  try {
    data = await response.json()
  } catch {}

  if (!response.ok) {
    const message =
      (data as { message?: string })?.message ||
      `API error: ${response.status}`

    throw new Error(message)
  }

  return data as T
}

export const api = {
  get<T>(path: string) {
    return request<T>(path)
  },

  post<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  patch<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  },

  delete<T>(path: string) {
    return request<T>(path, {
      method: 'DELETE',
    })
  },
}