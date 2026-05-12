const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiFetchOptions = RequestInit & {
  token?: string;
}



/**
 * Deletion message response type.
 */
export type DeletionMessageResponse = {
  message: string;
}



/**
 * Create an API entity.
 * @param path The path of the endpoint
 * @param data The necessary data to create this entity
 * @param token The access token
 * @returns The created entity
 */
export async function createAPIEntity<T>(path: string, data: {}, token: string) {
  return apiFetch<T>(path, {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}



export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T | null> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    let message = "An error has occured";

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
