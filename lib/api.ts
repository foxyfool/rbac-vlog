type ApiOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
};

export const fetcher = async (url: string, options: ApiOptions = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { method = "GET", headers = {}, body, token } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${url}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Post
export const getPosts = async (token: string) => {
  return fetcher("/api/posts", { token });
};

export const createPost = async (
  title: string,
  content: string,
  token: string
) => {
  return fetcher("/api/posts", {
    method: "POST",
    body: { title, content },
    token,
  });
};

export const updatePost = async (
  id: string,
  data: { title?: string; content?: string },
  token: string
) => {
  return fetcher(`/api/posts/${id}`, {
    method: "PUT",
    body: data,
    token,
  });
};

export const deletePost = async (id: string, token: string) => {
  return fetcher(`/api/posts/${id}`, {
    method: "DELETE",
    token,
  });
};

// Auth
export const verifyEmail = async (token: string) => {
  return fetcher(`/api/auth/verify/${token}`);
};
