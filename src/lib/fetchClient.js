const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

let accessToken = null;

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

// 인증 필요한 fetch (401 시 자동 토큰 갱신)
async function authFetch(url, options = {}) {
  try {
    return await baseFetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });
  } catch (error) {
    if (error.status === 401) {
      const { accessToken: newToken } = await baseFetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      accessToken = newToken;

      return baseFetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        },
      });
    }
    throw error;
  }
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
    authFetch(url, { method: 'DELETE', body: data ? JSON.stringify(data) : undefined }),
};

// 인증 불필요한 API
export const publicApi = {
  get: (url) => publicFetch(url, { method: 'GET' }),
  post: (url, data) =>
    publicFetch(url, { method: 'POST', body: JSON.stringify(data) }),
  patch: (url, data) =>
    publicFetch(url, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (url, data) =>
    publicFetch(url, { method: 'DELETE', body: data ? JSON.stringify(data) : undefined }),
};
// 로그인 성공시
export function setAccessToken(token) {
  accessToken = token;
}
