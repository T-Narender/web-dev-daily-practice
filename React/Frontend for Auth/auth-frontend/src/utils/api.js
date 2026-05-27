const API_BASE_URL = "http://localhost:3000";

function toUrl(path) {
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
}

export function getToken() {
  return localStorage.getItem("token") || "";
}

export async function apiFetch(path, options = {}, config = {}) {
  const { onUnauthorized } = config;
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(toUrl(path), {
    ...options,
    headers,
  });

  if (response.status === 401 && typeof onUnauthorized === "function") {
    onUnauthorized();
  }

  return response;
}

//api.js helps 