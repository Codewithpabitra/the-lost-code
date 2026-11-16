const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const TOKEN_KEY = "the-lost-code-token";

interface ApiErrorResponse {
  message?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;
    throw new Error(errorData.message || "Something went wrong");
  }

  return data as T;
}

export { TOKEN_KEY };
