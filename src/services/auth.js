const defaultHeaders = { "Content-Type": "application/json" };

export async function login({ email, password }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }
  return data;
}

export async function loginWithGoogle({ name, email }) {
  const res = await fetch("/api/auth/google-demo", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, email, googleId: `google-${Date.now()}` }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Google login failed");
  }
  return data;
}

export async function loginWithApple({ name, email }) {
  const res = await fetch("/api/auth/google-demo", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, email, googleId: `apple-${Date.now()}` }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Apple login failed");
  }
  return data;
}

export async function loginWithTwitter({ name, email }) {
  const res = await fetch("/api/auth/google-demo", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, email, googleId: `twitter-${Date.now()}` }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Twitter login failed");
  }
  return data;
}

export async function register({ name, email, password, role }) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Registration failed");
  }
  return data;
}

export function storeToken(token) {
  if (token) localStorage.setItem("auth_token", token);
}

export function getToken() {
  return localStorage.getItem("auth_token");
}

export async function me() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch("/api/auth/me", {
    headers: { ...defaultHeaders, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    localStorage.removeItem("auth_token");
    return null;
  }
  return await res.json();
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

export function removeToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
}

export function getUser() {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function setUser(user) {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}