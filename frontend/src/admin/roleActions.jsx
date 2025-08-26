// roleActions.js
import { clerkClient } from '@clerk/clerk-react';

/**
 * Assigns a role to a user by updating their publicMetadata.
 * @param {string} userId - The ID of the Clerk user.
 * @param {string} role - The role to assign (e.g., 'admin', 'moderator').
 */
export async function setRole(userId, role) {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
    alert(`Role "${role}" assigned successfully!`);
  } catch (error) {
    console.error("Error setting role:", error);
    alert("Failed to set role.");
  }
}

/**
 * Removes the role from a user by clearing the role field in publicMetadata.
 * @param {string} userId - The ID of the Clerk user.
 */
export async function removeRole(userId) {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: null },
    });
    alert("Role removed successfully!");
  } catch (error) {
    console.error("Error removing role:", error);
    alert("Failed to remove role.");
  }
}
