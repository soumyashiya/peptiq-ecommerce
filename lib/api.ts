/**
 * Client for the Central Order Management microservice.
 * Base URL and endpoint contracts: see API_DOCUMENTATION.md.
 */

export const API_BASE =
  'https://www.microservices.tech';
  // 'http://localhost:5003';
const TOKEN_KEY = 'peptiq-token';

/* ── JWT storage ─────────────────────────────────────────────────────────── */

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
};

/* ── Error normalization ─────────────────────────────────────────────────── */

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

const messageFromBody = (body: unknown, fallback: string): string => {
  if (body && typeof body === 'object') {
    const b = body as Record<string, unknown>;
    if (typeof b.error === 'string') return b.error;
    if (typeof b.message === 'string') return b.message;
  }
  return fallback;
};

/* ── Core fetch wrapper ──────────────────────────────────────────────────── */

type ApiInit = Omit<RequestInit, 'body'> & {
  /** JSON body — serialized automatically. */
  json?: unknown;
  /** Multipart form body — pass a FormData instance as-is. */
  form?: FormData;
  /** Attach the JWT (if one is stored). Defaults to true when a token exists. */
  auth?: boolean;
};

export async function apiFetch<T = unknown>(path: string, init: ApiInit = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const headers = new Headers(init.headers);

  const wantAuth = init.auth ?? true;
  if (wantAuth) {
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  let body: BodyInit | undefined;
  if (init.form) {
    body = init.form; // do NOT set Content-Type; the browser adds the boundary
  } else if (init.json !== undefined) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(init.json);
  }

  const res = await fetch(url, { ...init, headers, body });

  const contentType = res.headers.get('content-type') || '';
  const parsed: unknown = contentType.includes('application/json')
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    throw new ApiError(messageFromBody(parsed, `Request failed (${res.status})`), res.status, parsed);
  }

  return parsed as T;
}
