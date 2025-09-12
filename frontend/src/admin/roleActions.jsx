// RoleActions.js
import useClerkFetch from "./useAuth";

export async function setRole(userId, role) {
  const fetchWithAuth = useClerkFetch();
  const res = await fetchWithAuth(`/api/admin/users/${userId}/role`, {
    method: "POST",
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error("Failed to set role");
  return res.json();
}

export async function removeRole(userId) {
  const fetchWithAuth = useClerkFetch();
  const res = await fetchWithAuth(`/api/admin/users/${userId}/role`, {
    method: "POST",
    body: JSON.stringify({ role: null }), // clears role
  });
  if (!res.ok) throw new Error("Failed to remove role");
  return res.json();
}
