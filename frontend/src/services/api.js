// src/services/api.js

// ✅ Get today's tasks from backend
export async function getTodayTasks(token) {
  const res = await fetch("http://localhost:5000/api/tasks/today", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch today's tasks");
  }

  return res.json(); // tasks list return karega
}
