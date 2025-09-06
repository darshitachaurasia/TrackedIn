// frontend/src/admin/roleActions.js

/**
 * Assigns a role to a user by calling the backend API.
 * @param {string} userId - The ID of the Clerk user.
 * @param {string} role - The role to assign (e.g., 'admin', 'moderator').
 */
export async function setRole(userId, role) {
  try {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) throw new Error("Failed to set role");
    alert(`Role "${role}" assigned successfully!`);
  } catch (error) {
    console.error("Error setting role:", error);
    alert("Failed to set role.");
  }
}

/**
 * Removes the role from a user by calling the backend API.
 * @param {string} userId - The ID of the Clerk user.
 */
export async function removeRole(userId) {
  try {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: null }),
    });

    if (!res.ok) throw new Error("Failed to remove role");
    alert("Role removed successfully!");
  } catch (error) {
    console.error("Error removing role:", error);
    alert("Failed to remove role.");
  }
}
