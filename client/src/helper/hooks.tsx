import { useState, useEffect } from "react";

export const useFetch = <T,>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export const usePost = <TResponse, TBody>() => {
  const [response, setResponse] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (url: string, body: TBody, options?: RequestInit) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: TResponse = await response.json();
      setResponse(data);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { postData, response, loading, error };
};

export const useUpdate = <TResponse, TBody>() => {
  const [response, setResponse] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (
    url: string,
    body: TBody,
    method: "PUT" | "PATCH" = "PUT",
    options?: RequestInit
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: TResponse = await response.json();
      setResponse(data);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { updateData, response, loading, error };
};

export const useDelete = <TResponse,>() => {
  const [response, setResponse] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (url: string, options?: RequestInit) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          ...(options?.headers || {}),
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: TResponse = await response.json();
      setResponse(data);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, response, loading, error };
};
