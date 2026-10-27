/** Session transport boundary for the future independently designed backend. */
export async function fetchSession(request = fetch) {
  return request('/api/session', {
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
}
