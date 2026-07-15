export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

export async function apiFetch(path: string, opts: RequestInit = {}, token?: string) {
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.headers || {})
  } as Record<string,string>;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  return res;
}
