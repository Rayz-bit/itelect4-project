import type {
  ApiEvent,
  ApiRsvp,
  NewRsvp,
  LoginBody,
  RegisterBody,
  AuthResponse,
  RegisterResponse,
  AiReview,
  AiRequestBody,
  
} from "../types/index";
import useAuthStore from "../store/authStore";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean; // true = attach the Bearer token
}

// The one place that calls fetch.
async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const rawUrl: string | undefined = import.meta.env.VITE_API_URL;

  if (!rawUrl) {
    throw new Error("VITE_API_URL is not set");
  }

  // Drop any trailing slashes so we never build "//api/..."
  const baseUrl = rawUrl.replace(/\/+$/, "");

  const { method = "GET", body, auth = false } = options;
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = useAuthStore.getState().token;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // An expired or invalid token: clear it so ProtectedRoute sends
    // the user back to /login.
    if (res.status === 401 && auth) {
      useAuthStore.getState().logout();
    }

    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (typeof data?.message === "string") {
        message = data.message;
      }
    } catch {
      // the reply had no JSON body; keep the default message
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ----- Public routes -----
export function fetchEvents(): Promise<ApiEvent[]> {
  return request<ApiEvent[]>("/api/events");
}

export function fetchEventById(id: string): Promise<ApiEvent> {
  return request<ApiEvent>(`/api/events/${id}`);
}

// ----- Auth routes -----
export function registerUser(body: RegisterBody): Promise<RegisterResponse> {
  return request<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body,
  });
}

export function loginUser(body: LoginBody): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body,
  });
}

// ----- Private routes (Bearer token) -----
export function fetchRsvps(): Promise<ApiRsvp[]> {
  return request<ApiRsvp[]>("/api/rsvps", { auth: true });
}

export function createRsvp(newRsvp: NewRsvp): Promise<ApiRsvp> {
  return request<ApiRsvp>("/api/rsvps", {
    method: "POST",
    body: newRsvp,
    auth: true,
  });
}
// ----- AI route (private): the browser never calls Gemini -----
export function askAi(body: AiRequestBody): Promise<AiReview> {
  return request<AiReview>("/api/ai", {
    method: "POST",
    body,
    auth: true,
  });
}