// src/utils/api.ts
export interface ApiOptions extends RequestInit {
  // Extend RequestInit if needed
}

export async function api<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    // Attempt to parse error message from response
    let errorMessage = `Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Ignore JSON parse errors and use default message
    }
    throw new Error(errorMessage);
  }

  // If response has no content, return null
  if (response.status === 204) {
    return null as unknown as T;
  }

  return response.json();
}


export async function get<T>(url: string): Promise<T> {
    return api<T>(url, {
      method: 'GET',
    });
  }
  
  export async function post<T, U>(url: string, body: U): Promise<T> {
    return api<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
  
  export async function put<T, U>(url: string, body: U): Promise<T> {
    return api<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }
  
  export async function del<T>(url: string): Promise<T> {
    return api<T>(url, {
      method: 'DELETE',
    });
  }
  