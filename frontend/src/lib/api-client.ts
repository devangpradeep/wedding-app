const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

// An empty base URL deliberately supports a same-origin API reverse proxy.
export const apiBaseUrl =
  configuredBaseUrl?.replace(/\/+$/, "") ?? "http://localhost:8080";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`The API returned HTTP ${status}.`);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiGet(
  path: string,
  signal?: AbortSignal,
): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { Accept: "application/json" },
    signal: signal
      ? AbortSignal.any([signal, AbortSignal.timeout(8000)])
      : AbortSignal.timeout(8000),
    cache: "no-store",
  });

  if (!response.ok) throw new ApiError(response.status);
  return response.json() as Promise<unknown>;
}
