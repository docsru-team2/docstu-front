const BASE_URL =
  typeof window !== 'undefined'
    ? '/api'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// 공통 fetch 로직
async function baseFetch(url, options = {}) {
  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: error.message || '요청 중 오류가 발생했습니다.',
    };
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// 인증 필요한 fetch
async function authFetch(url, options = {}) {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
    return baseFetch(url, {
      ...options,
      headers: {
        Cookie: cookieHeader,
        ...options.headers,
      },
    });
  }

  return baseFetch(url, {
    ...options,
    credentials: 'include',
  });
}

// 인증 불필요한 fetch
async function publicFetch(url, options = {}) {
  return baseFetch(url, options);
}

// 인증 필요한 API
export const api = {
  get: (url) => authFetch(url, { method: 'GET' }),
  post: (url, data) =>
    authFetch(url, { method: 'POST', body: JSON.stringify(data) }),
  patch: (url, data) =>
    authFetch(url, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (url, data) =>
    authFetch(url, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
    }),
};

// 인증 불필요한 API
export const publicApi = {
  get: (url) => publicFetch(url, { method: 'GET' }),
  post: (url, data) =>
    publicFetch(url, { method: 'POST', body: JSON.stringify(data) }),
  patch: (url, data) =>
    publicFetch(url, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (url, data) =>
    publicFetch(url, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
    }),
};
