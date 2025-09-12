import { useAuth } from "@clerk/clerk-react";

function useClerkFetch() {
  const { getToken } = useAuth();

  return async (url, options = {}) => {
    const token = await getToken({ template: "default" });
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`, // send Clerk token
        "Content-Type": "application/json",
      },
    });
  };
}

export default useClerkFetch;
