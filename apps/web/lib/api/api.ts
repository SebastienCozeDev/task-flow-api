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
 * Get one or many API entities.
 * @param path The path of the endpoint
 * @param token The access token
 * @returns The finded entities
 */
export async function getAPIEntities<T>(path: string, token: string) {
  return apiFetch<T>(path, {
    method: "GET",
    token,
  });
}



/**
 * Create an API entity.
 * @param path The path of the endpoint
 * @param data The necessary data to used create this entity
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



/**
 * Update an API entity.
 * @param path The path of the endpoint
 * @param data The necessary data used to update this entity
 * @param token The access token
 * @returns The updated entity
 */
export async function updateAPIEntity<T>(path: string, data: {}, token: string) {
  return apiFetch<T>(path, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}



/**
 * Delete an API entity.
 * @param path The path of the endpoint
 * @param token The access token
 * @returns The deletion message
 */
export async function deleteAPIEntity(path: string, data: {}, token: string): Promise<DeletionMessageResponse | null> {
  return apiFetch<DeletionMessageResponse>(path, {
    method: "PATCH",
    token,
    ...(data ? { body: JSON.stringify(data) }: {}),
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
